import { S3 } from "@aws-sdk/client-s3";

/**
 * 上传文件到S3存储桶
 * @param file 要上传的文件
 * @returns 包含文件键和文件名的对象
 */
export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  const s3 = new S3({
    region: process.env.NEXT_PUBLIC_S3_REGION || "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
    },
  });

  // 生成唯一的文件键
  const file_key = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: file_key,
    Body: file,
    ContentType: file.type, // 设置正确的Content-Type
  };

  try {
    await s3.putObject(params);
  } catch (error) {
    console.error("上传到S3时出错:", error);
    throw new Error("文件上传失败");
  }

  return {
    file_key,
    file_name: file.name,
  };
}

/**
 * 获取S3文件的URL
 * @param file_key 文件在S3中的键
 * @returns S3文件的完整URL
 */
export function getS3Url(file_key: string): string {
  if (!process.env.NEXT_PUBLIC_S3_BUCKET_NAME || !process.env.NEXT_PUBLIC_S3_REGION) {
    throw new Error("S3配置缺失");
  }
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${encodeURIComponent(file_key)}`;
}
