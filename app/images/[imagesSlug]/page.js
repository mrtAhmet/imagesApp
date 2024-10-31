"use client";

import { useEffect, useState } from "react";
import SlugItem from "./slug-item";

async function getImages(searchQuery) {
  const res = await fetch(
    `http://localhost:3000/api/slugImage?q=${searchQuery}`,
    {
      cache: "no-store", // Cache'i devre dışı bırak
    }
  );

  if (!res.ok) {
    throw new Error("Veri alınamadı.");
  }

  return res.json();
}

export default function ImageDetailsPage({ params }) {
  const title = decodeURIComponent(params.imagesSlug); // URL'den gelen değeri çözümlüyoruz
  const [image, setImage] = useState(null); // İlk başta image state'ini null yapıyoruz

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageData = await getImages(title);
        setImage(imageData[0]); // İlk veriyi al ve state'e ata
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [title]); // title değiştiğinde yeniden çağır

  if (!image) {
    return <p>Loading...</p>; // Veriler yüklenirken loading mesajı
  }

  return (
    <main>
      <p>This is a {title} slug page</p>
      <p>It is not completed yet</p>
      <SlugItem image={image} />
    </main>
  );
}
