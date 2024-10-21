import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import { Readable } from "stream";

/**
 * 从S3下载文件并保存到本地临时目录
 * @param file_key S3中的文件键
 * @returns 返回保存的本地文件路径
 */
export async function downloadFromS3(file_key: string): Promise<string> {
  const s3 = new S3({
    region: process.env.NEXT_PUBLIC_S3_REGION || "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
    },
  });

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: file_key,
  };

  try {
    const obj = await s3.getObject(params);
    const file_name = `/tmp/elliott${Date.now()}.pdf`;

    if (obj.Body instanceof Readable) {
      return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(file_name);
        writeStream.on("error", reject);
        writeStream.on("finish", () => resolve(file_name));
        // @ts-expect-error 预期 obj.Body 可能为 null 或undefined
        obj.Body?.pipe(writeStream);
      });
    } else {
      throw new Error("无效的S3对象Body");
    }
  } catch (error) {
    console.error("从S3下载文件时出错:", error);
    throw error;
  }
}

// 使用示例
// downloadFromS3("uploads/1693568801787chongzhisheng_resume.pdf")
//   .then(localPath => console.log("文件已下载到:", localPath))
//   .catch(error => console.error("下载失败:", error));
