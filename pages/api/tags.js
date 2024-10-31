import sql from "mssql";
import { config } from "@/lib/db";

export default async function getTags(req, res) {
  const { tag, sort } = req.query;
  console.log(sort);
  try {
    let pool = await sql.connect(config);
    let query = `SELECT * FROM images WHERE tags LIKE @tag `;
    if (sort) {
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
    }
    let result = await pool
      .request()
      .input("tag", sql.NVarChar, `%${tag}%`)
      .query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
  } finally {
    await sql.close();
  }
}
