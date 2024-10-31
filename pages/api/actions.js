import sql from "mssql";
import { config } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ID, action } = req.body;

    try {
      // Veritabanı bağlantısını açılıyor...
      let pool = await sql.connect(config);

      // Aksiyon kontrolü
      if (action === "decrement") {
        await pool
          .request()
          .input("ID", sql.Int, ID)
          .query("UPDATE images SET likeCount = likeCount - 1 WHERE ID = @ID");
      } else {
        await pool
          .request()
          .input("ID", sql.Int, ID)
          .query("UPDATE images SET likeCount = likeCount + 1 WHERE ID = @ID");
      }

      res.status(200).json({ message: "Like count updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
