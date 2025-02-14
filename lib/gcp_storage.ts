import { Storage } from "@google-cloud/storage";

import { IStorage } from "./storage";

class GCPCloudStorage implements IStorage {
  private client: Storage;

  constructor(projectId: string, keyFilename: string) {
    this.client = new Storage({
      projectId,
      keyFilename,
    });
  }

  async getUrlByKey(
    bucketName: string,
    key: string | null
  ): Promise<string | null> {
    if (!key) {
      return null;
    }

    const bucket = this.client.bucket(bucketName);
    const [url] = await bucket.file(key).getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 15 * 60 * 1000,
    });

    return url;
  }

  async putByKey(bucketName: string, key: string, file: File): Promise<void> {
    const bucket = this.client.bucket(bucketName);
    const blob = bucket.file(key);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.type,
      },
    });

    const buffer = Buffer.from(await file.arrayBuffer());

    blobStream.on("error", (error) => {
      throw error;
    });

    blobStream.end(buffer);
  }

  async deleteByKey(bucketName: string, key: string): Promise<void> {
    const bucket = this.client.bucket(bucketName);
    await bucket.file(key).delete();
  }

  async getAll(bucketName: string): Promise<{
    bucketName: string;
    numberOfObjects: number;
    objects: StorageObject[];
  }> {
    const bucket = this.client.bucket(bucketName);
    const [files] = await bucket.getFiles();

    const urls = await Promise.all(
      files.map((file) => this.getUrlByKey(bucketName, file.name))
    );

    return {
      bucketName: bucket.name,
      numberOfObjects: files.length,
      objects: files.map((file, idx) => ({
        Url: String(urls[idx]),
        Key: file.name,
        LastModified: new Date(String(file.metadata.updated)),
        Size: Number(file.metadata.size),
        StorageClass: String(file.metadata.storageClass),
      })),
    };
  }
}

export const avatarStorageGCS = new GCPCloudStorage(
  process.env.GCP_PROJECT_ID!,
  "gcp_key.json"
);
