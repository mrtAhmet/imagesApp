"use client";

import { GoHeart, GoHeartFill } from "react-icons/go";
import { useEffect, useState } from "react";

export default function Like({ ID, initialLikeCount }) {
  const [like, setLike] = useState(null);
  const [likeCount, setLikeCount] = useState(initialLikeCount); // Başlangıç like sayısı

  // İlk yüklenme anında localStorage'dan like bilgisi al
  useEffect(() => {
    const savedLike = window.localStorage.getItem(`isLiked-${ID}`);
    setLike(savedLike === "true" ? true : false); // True ya da false olarak ayarla
  }, [ID]);

  // Like durumu değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (like !== null) {
      window.localStorage.setItem(`isLiked-${ID}`, like);
    }
  }, [like, ID]);

  // Like işlemi için API'ye istek gönderen fonksiyon
  const handleLike = async () => {
    try {
      const currentLike = like === null ? false : like; // Mevcut like durumunu al

      // API'ye istek gönderiyoruz
      const response = await fetch("/api/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID,
          action: currentLike ? "decrement" : "increment",
        }), // Mevcut duruma göre aksiyonu belirliyoruz.
      });

      if (!response.ok) {
        throw new Error("Failed to update like count");
      }

      // Şimdi like durumunu güncelleyelim
      setLike(!currentLike); // Like durumunu değiştiriyoruz.
      // Güncel likeCount değerini almak için yeni API çağrısı yapıyoruz
      await fetchUpdatedLikeCount(); // Güncel like sayısını al
    } catch (err) {
      console.error("Error updating like count", err);
    }
  };

  // Güncel likeCount değerini almak için bir API isteği
  const fetchUpdatedLikeCount = async (retryCount = 3) => {
    try {
      const response = await fetch(`/api/getImages?ID=${ID}`); // ID'ye göre güncel veriyi alıyoruz
      if (!response.ok) {
        throw new Error("Failed to fetch updated like count");
      }

      const data = await response.json();
      setLikeCount(data.likeCount); // Yeni likeCount değerini duruma ayarlıyoruz
    } catch (err) {
      console.error("Error fetching updated like count", err);

      // Eğer hata olursa ve yeniden deneme hakkı kaldıysa tekrar dene
      if (retryCount > 0) {
        console.log(`Retrying... Attempts left: ${retryCount}`);
        setTimeout(() => fetchUpdatedLikeCount(retryCount - 1), 1000); // 1 saniye bekleyip tekrar dene
      } else {
        alert("Like sayısı güncellenemedi. Lütfen tekrar deneyin.");
      }
    }
  };

  useEffect(() => {
    fetchUpdatedLikeCount(); // Bileşen yüklendiğinde güncel like sayısını al
  }, [ID]); // ID değiştiğinde tekrar çalışır

  return (
    <>
      <label onClick={handleLike} style={{ cursor: "pointer" }}>
        {like ? <GoHeartFill style={{ color: "red" }} /> : <GoHeart />}
      </label>
      <label style={{ cursor: "pointer" }}>{likeCount} Likes</label>
    </>
  );
}
