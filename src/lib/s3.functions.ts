import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  getS3,
  objectUrl,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  getSignedUrl,
} from "./s3.server";

export const getS3UploadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { filename: string; contentType: string }) => d)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { client, bucket, region } = getS3();
    const safe = data.filename.replace(/[^\w.\-]+/g, "_");
    const key = `${userId}/${Date.now()}-${safe}`;
    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: data.contentType || "application/octet-stream",
    });
    const url = await getSignedUrl(client, cmd, { expiresIn: 300 });
    return { uploadUrl: url, key, publicUrl: objectUrl(bucket, region, key) };
  });

export const getS3DownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key: string; filename: string }) => d)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    if (!data.key.startsWith(`${userId}/`)) {
      throw new Error("Forbidden");
    }
    const { client, bucket } = getS3();
    const cmd = new GetObjectCommand({
      Bucket: bucket,
      Key: data.key,
      ResponseContentDisposition: `attachment; filename="${data.filename.replace(/"/g, "")}"`,
    });
    const url = await getSignedUrl(client, cmd, { expiresIn: 300 });
    return { downloadUrl: url };
  });

export const getS3PreviewUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key: string }) => d)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    if (!data.key.startsWith(`${userId}/`)) {
      throw new Error("Forbidden");
    }
    const { client, bucket } = getS3();
    const cmd = new GetObjectCommand({ Bucket: bucket, Key: data.key });
    const url = await getSignedUrl(client, cmd, { expiresIn: 300 });
    return { previewUrl: url };
  });

export const deleteS3Object = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key: string }) => d)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    if (!data.key.startsWith(`${userId}/`)) {
      throw new Error("Forbidden");
    }
    const { client, bucket } = getS3();
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: data.key }));
    return { ok: true };
  });
