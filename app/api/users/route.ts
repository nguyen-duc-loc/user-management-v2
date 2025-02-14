import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { avatarStorageS3 } from "@/lib/aws_s3";
import { cloudProvider } from "@/lib/cloud_provider";
import { avatarStorageGCS } from "@/lib/gcp_storage";
import dbConnect from "@/lib/mysql";
import { UserSchema } from "@/lib/schema";

export async function GET(request: NextRequest) {
  try {
    const connection = await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const offset = limit * (page - 1);

    const [totalUsersResult] = await connection.execute(
      `SELECT COUNT(*) AS count FROM users`
    );

    const [usersResult] = await connection.execute(
      `SELECT id, fullname, email, birthdate, phone, avatar FROM users LIMIT ${limit} OFFSET ${offset}`
    );

    const users = usersResult as User[];
    const avatarStorage =
      cloudProvider === "aws" ? avatarStorageS3 : avatarStorageGCS;
    const bucketName =
      cloudProvider === "aws"
        ? process.env.AWS_BUCKET_NAME!
        : process.env.GCP_BUCKET_NAME!;
    const avatarUrls = await Promise.all(
      users.map((user) => avatarStorage.getUrlByKey(bucketName, user.avatar))
    );

    for (let i = 0; i < users.length; i++) {
      users[i].avatar = avatarUrls[i];
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          totalUsers: (totalUsersResult as { count: number }[])[0].count,
          users,
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
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const connection = await dbConnect();

    const body = await request.json();

    const validatedData = UserSchema.safeParse(body);
    if (!validatedData.success) {
      throw validatedData.error;
    }

    const { fullname, email, birthdate, phone } = validatedData.data;

    const [result] = await connection.execute(
      `INSERT INTO users(fullname, email, birthdate, phone) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?)`,
      [fullname, email, format(birthdate, "dd/MM/yyyy"), phone]
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          id: (result as { insertId: number }).insertId,
          ...validatedData.data,
        },
      },
      {
        status: 201,
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
