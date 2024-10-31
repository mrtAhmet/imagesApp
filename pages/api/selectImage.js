import sql from "mssql";
import { config } from "@/lib/db";

export default async function getImage(req, res) {
  // Query'den ID değerini alıyoruz
  const { id } = req.query;
  try {
    let pool = await sql.connect(config);
    let query = `SELECT * FROM images WHERE ID = @ID`;
    let result = await pool
      .request()
      .input("ID", sql.Int, id) // "${ID}" yerine direkt id kullanıyoruz
      .query(query);

    // Başarılı sonucu geri döndürüyoruz
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log("Database query error: ", error);
    res.status(500).json({ error: "Veritabanı hatası" });
  } finally {
    await sql.close();
  }
}
