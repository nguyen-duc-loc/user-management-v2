import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { ZodError } from "zod";

import dbConnect from "@/lib/mysql";
import { getImgUrlFromKey, s3 } from "@/lib/s3";
import { AvatarSchema } from "@/lib/schema";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      {
        success: false,
        data: null,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const connection = await dbConnect();

    const [userResult] = await connection.execute(
      `SELECT avatar FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    if ((userResult as unknown[]).length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    const file = (await request.formData()).get("image") as File;

    const validatedData = AvatarSchema.safeParse({
      image: [file],
    });
    if (!validatedData.success) {
      throw validatedData.error;
    }

    const { image } = validatedData.data;

    if (!image || image.length === 0) {
      throw new Error("Image is required");
    }

    const newAvatar = image[0];
    if (!newAvatar.type.startsWith("image/")) {
      throw new Error("File type is not supported");
    }

    const currentAvatar = (userResult as User[])[0].avatar;

    let s3Key;

    if (!currentAvatar) {
      s3Key = uuid();
    } else {
      s3Key = currentAvatar;
    }

    const buffer = Buffer.from(await newAvatar.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      Body: buffer,
      ContentType: newAvatar.type,
    });

    await s3.send(command);

    await connection.execute(`UPDATE users SET avatar = ? WHERE id = ?`, [
      s3Key,
      id,
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          avatarUrl: await getImgUrlFromKey(s3Key),
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        data: null,
      },
      {
        status: error instanceof ZodError ? 400 : 500,
      }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      {
        success: false,
        data: null,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const connection = await dbConnect();

    const [userResult] = await connection.execute(
      `SELECT avatar FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    if ((userResult as unknown[]).length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    const user = (userResult as User[])[0];

    if (!user.avatar) {
      return new NextResponse(null, {
        status: 204,
      });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: user.avatar,
    });

    await s3.send(command);

    await connection.execute(`UPDATE users SET avatar = ? WHERE id = ?`, [
      null,
      id,
    ]);

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        data: null,
      },
      {
        status: error instanceof ZodError ? 400 : 500,
      }
    );
  }
}
