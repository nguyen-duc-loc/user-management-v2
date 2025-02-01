import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import dbConnect from "@/lib/mysql";
import { getImgUrlFromKey, s3 } from "@/lib/s3";
import { UserSchema } from "@/lib/schema";

export async function GET(
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
      `SELECT id, fullname, email, birthdate, phone, avatar FROM users WHERE id = ? LIMIT 1`,
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
    user.avatar = await getImgUrlFromKey(user.avatar);

    return NextResponse.json(
      {
        success: true,
        data: user,
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
        status: 500,
      }
    );
  }
}

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
      `SELECT id FROM users WHERE id = ? LIMIT 1`,
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

    const body = await request.json();

    const validatedData = UserSchema.safeParse(body);
    if (!validatedData.success) {
      throw validatedData.error;
    }

    const { fullname, email, birthdate, phone } = validatedData.data;

    await connection.execute(
      `UPDATE users SET fullname = ?, email = ?, birthdate = STR_TO_DATE(?, '%d/%m/%Y'), phone = ? WHERE id = ?`,
      [fullname, email, format(birthdate, "dd/MM/yyyy"), phone, id]
    );

    return NextResponse.json(
      {
        success: true,
        data: { id, ...validatedData.data },
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
      `SELECT id, avatar FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    if ((userResult as unknown[]).length === 0) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const user = (userResult as User[])[0];

    if (user.avatar) {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: user.avatar,
      });

      await s3.send(command);
    }

    await connection.execute(`DELETE FROM users WHERE id = ?`, [id]);

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: error instanceof ZodError ? 400 : 500,
      }
    );
  }
}
