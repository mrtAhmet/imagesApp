import sql from "mssql";
import { config } from "@/lib/db";

export default async function saveImage(image) {
  // MSSQL bağlantısını oluştur
  try {
    const pool = await sql.connect(config);

    // SQL sorgusunu oluştur
    const query = `
      INSERT INTO images (username, title, tags, imageURL, imageDesc) 
      VALUES (@username, @title, @tags, @imageURL, @imageDesc)
    `;

    // Sorgu için parametreleri tanımla
    const request = pool
      .request()
      .input("username", sql.NVarChar, image.username)
      .input("title", sql.NVarChar, image.title)
      .input("tags", sql.NVarChar, image.tags)
      .input("imageURL", sql.NVarChar, image.imageURL)
      .input("imageDesc", sql.NVarChar, image.imageDesc);

    // Sorguyu çalıştır
    await request.query(query);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save image.");
  } finally {
    // Bağlantıyı kapat
    await sql.close();
  }
}
