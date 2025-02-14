import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { ZodError } from "zod";

import { avatarStorageS3 } from "@/lib/aws_s3";
import { cloudProvider } from "@/lib/cloud_provider";
import { avatarStorageGCS } from "@/lib/gcp_storage";
import dbConnect from "@/lib/mysql";
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
    let key;
    if (!currentAvatar) {
      key = uuid();
    } else {
      key = currentAvatar;
    }
    const avatarStorage =
      cloudProvider === "aws" ? avatarStorageS3 : avatarStorageGCS;
    const bucketName =
      cloudProvider === "aws"
        ? process.env.AWS_BUCKET_NAME!
        : process.env.GCP_BUCKET_NAME!;
    await avatarStorage.putByKey(bucketName, key, newAvatar);

    await connection.execute(`UPDATE users SET avatar = ? WHERE id = ?`, [
      key,
      id,
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          avatarUrl: await avatarStorage.getUrlByKey(bucketName, key),
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

    const avatarStorage =
      cloudProvider === "aws" ? avatarStorageS3 : avatarStorageGCS;
    const bucketName =
      cloudProvider === "aws"
        ? process.env.AWS_BUCKET_NAME!
        : process.env.GCP_BUCKET_NAME!;
    await avatarStorage.deleteByKey(bucketName, user.avatar);

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
