import { awsConfig } from "@/lib/aws";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: awsConfig.region,
  credentials: {
    accessKeyId: awsConfig.accessKeyID,
    secretAccessKey: awsConfig.secretAccessKey,
  },
});

export async function uploadToS3(file, fileName) {
  // File nesnesini Buffer'a dönüştürün
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: awsConfig.bucketName,
    Key: fileName, // Yüklenen dosyanın adı
    Body: fileBuffer, // Buffer olarak gönderin
    ContentType: file.type || "application/octet-stream", // Dosya türü
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // S3'teki dosyanın URL'sini oluşturun
    const imageUrl = `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${fileName}`;
    console.log("File uploaded successfully:", imageUrl);
    return imageUrl; // URL'yi döndürün
  } catch (error) {
    console.error("S3 Upload Error", error);
    throw new Error("Error uploading file to S3");
  }
}
