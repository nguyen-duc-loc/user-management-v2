import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { avatarStorageS3 } from "@/lib/aws_s3";
import { cloudProvider } from "@/lib/cloud_provider";
import { avatarStorageGCS } from "@/lib/gcp_storage";

export async function GET() {
  try {
    const avatarStorage =
      cloudProvider === "aws" ? avatarStorageS3 : avatarStorageGCS;
    const bucketName =
      cloudProvider === "aws"
        ? process.env.AWS_BUCKET_NAME!
        : process.env.GCP_BUCKET_NAME!;
    const data = await avatarStorage.getAll(bucketName);

    return NextResponse.json(
      {
        success: true,
        data,
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
