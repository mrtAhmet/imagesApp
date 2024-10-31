import sql from "mssql";
import { config } from "@/lib/db";

export default async function slugImage(req, res) {
  const { q } = req.query; // Query string'den gelen arama parametresi
  console.log(q);

  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("searchQuery", sql.NVarChar, `%${q}%`).query(`
        SELECT * 
        FROM images 
        WHERE title LIKE @searchQuery 
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ error: "Veritabanı hatası" });
  } finally {
    await sql.close();
  }
}
