import sql from "mssql";
import { config } from "@/lib/db";

export default async function handler(req, res) {
  const { q, sort } = req.query; // Arama ve sıralama parametreleri
  console.log(sort);
  try {
    let pool = await sql.connect(config);

    let query = `
      SELECT * 
      FROM images
    `;

    if (q && sort) {
      query += ` WHERE title LIKE @searchQuery OR tags LIKE @searchQuery`;

      // Sıralama işlemi
      switch (sort) {
        case "new":
          query += " ORDER BY uploadTime DESC";
          break;
        case "old":
          query += " ORDER BY uploadTime ASC";
          break;
        case "most-liked":
          query += " ORDER BY likeCount DESC";
          break;
        default:
          query += " ORDER BY uploadTime DESC";
          break;
      }
    } else {
      query += ` WHERE title LIKE @searchQuery OR tags LIKE @searchQuery`;
    }

    let result = await pool
      .request()
      .input("searchQuery", sql.NVarChar, `%${q}%`)
      .query(query);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ error: "Veritabanı hatası" });
  } finally {
    await sql.close();
  }
}
