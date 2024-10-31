// pages/api/getImages.js
import sql from "mssql";
import { config } from "@/lib/db";

// Tüm görüntüleri almak için API fonksiyonu
export const getImages = async () => {
  try {
    // Veritabanına bağlan
    let pool = await sql.connect(config);

    // SQL sorgusunu çalıştır ve sonucu al
    let result = await pool
      .request()
      .query("SELECT TOP 12 * FROM images ORDER BY uploadTime DESC");

    // Sonuçtan verileri döndür
    return result.recordset; // Veriler recordset içinde döner
  } catch (error) {
    console.error("Database query error: ", error);
    throw new Error("Veritabanından veri çekme hatası");
  } finally {
    // Bağlantıyı kapat
    await sql.close();
  }
};

export const getQuery = async (searchQuery) => {
  try {
    // Veritabanına bağlan
    let pool = await sql.connect(config);

    // SQL sorgusunu parametreli olarak çalıştır
    let result = await pool
      .request()
      .input("searchQuery", sql.NVarChar, `%${searchQuery}%`) // Arama kelimesini LIKE ifadesinde kullan
      .query(`
        SELECT * 
        FROM images 
        WHERE title LIKE @searchQuery 
        OR tags LIKE @searchQuery
      `);

    // Sonuçları döndür
    return result.recordset; // Veriler recordset içinde döner
  } catch (error) {
    console.error("Database query error: ", error);
    throw new Error("Veritabanından veri çekme hatası");
  } finally {
    // Bağlantıyı kapat
    await sql.close();
  }
};

// Belirli bir görüntüyü ID ile almak için fonksiyon
const getImageById = async (req, res) => {
  const { ID } = req.query; // URL'den ID parametresini al

  try {
    // Veritabanına bağlan
    let pool = await sql.connect(config);

    // SQL sorgusunu çalıştır ve sonucu al
    let result = await pool
      .request()
      .input("ID", sql.Int, ID) // ID parametresi ile sorgu yap
      .query("SELECT * FROM images WHERE ID = @ID");

    // Sonuçtan verileri döndür
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Görüntü bulunamadı" });
    }

    return res.status(200).json(result.recordset[0]); // Tek bir kayıt döner
  } catch (error) {
    console.error("Database query error: ", error);
    return res
      .status(500)
      .json({ message: "Veritabanından veri çekme hatası" });
  } finally {
    // Bağlantıyı kapat
    await sql.close();
  }
};

// API'yi yönlendirmek için bir fonksiyon
export default async function handler(req, res) {
  if (req.method === "GET" && req.query.ID) {
    // ID ile istek geldiyse getImageById fonksiyonunu çağır
    return await getImageById(req, res);
  } else if (req.method === "GET") {
    // Diğer durumlarda getImages fonksiyonunu çağır
    return await getImages(req, res);
  } else {
    // Geçersiz istek
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
