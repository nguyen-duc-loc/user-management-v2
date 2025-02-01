import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getImgUrlFromKey, s3 } from "@/lib/s3";

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
    });

    const { Name, KeyCount, Contents } = await s3.send(command);

    const objects = (Contents as AvatarObject[]) || [];

    const urls = await Promise.all(
      objects.map((obj) => getImgUrlFromKey(obj.Key))
    );

    for (let i = 0; i < urls.length; i++) {
      objects[i].Url = String(urls[i]);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          bucketName: Name || "",
          numberOfObjects: KeyCount || 0,
          objects,
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
