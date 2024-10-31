"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import saveImage from "./save"; // Bu dosya veritabanına kaydetme işlemini yapar
import { uploadToS3 } from "./aws"; // S3'e yükleme işlemini yapar

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareImage(prevState, formData) {
  const image = {
    title: formData.get("title"),
    username: formData.get("username"),
    tags: formData.get("tags"),
    description: formData.get("description"),
    image: formData.get("image"),
  };

  console.log("Image Description:", image.description); // Kontrol için
  console.log(image.image);

  // Geçersiz girişleri kontrol et
  if (
    isInvalidText(image.title) ||
    isInvalidText(image.username) ||
    isInvalidText(image.tags) ||
    isInvalidText(image.description) ||
    !image.image ||
    image.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }

  // Resmi S3'e yükleyin ve URL'yi alın
  const fileName = `images/${Date.now()}_${image.image.name}`;
  const imageUrl = await uploadToS3(image.image, fileName);

  // Resim verisini oluştur
  const imageData = {
    username: image.username,
    title: image.title,
    tags: image.tags,
    imageURL: imageUrl,
    imageDesc: image.description || "", // Boş bir string ile doldur
  };

  console.log("Image Data:", imageData); // Kontrol için

  // Veritabanına kaydet
  await saveImage(imageData);
  revalidatePath("/images");
  redirect("/images");
}
