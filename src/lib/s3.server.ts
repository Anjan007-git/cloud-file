import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export function getS3() {
  const region = process.env.AWS_REGION!;
  const bucket = process.env.AWS_BUCKET_NAME!;
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  return { client, bucket, region };
}

export function objectUrl(bucket: string, region: string, key: string) {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, getSignedUrl };
