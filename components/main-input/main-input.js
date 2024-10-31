"use client";

import { useEffect, useState } from "react";
import classes from "./main-input.module.css";
import { useRouter } from "next/navigation";

export default function MainInput() {
  const router = useRouter();
  const [placeholderText, setPlaceholderText] = useState(""); // Başlangıç boş
  const fullPlaceholder = "Search an image..."; // Animasyonlu yazılacak metin
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      // Sınır kontrolü: Eğer metnin uzunluğunu aşarsa durdur
      if (currentIndex < fullPlaceholder.length) {
        // Sadece yeni karakter ekle
        setPlaceholderText((prev) =>
          fullPlaceholder.slice(0, currentIndex + 1)
        );
        currentIndex++;
      } else {
        clearInterval(intervalId); // Tamamlandığında interval'i durdur
      }
    }, 300); // 500ms gecikme

    // Temizlik: bileşen unmount olduğunda interval temizlenir
    return () => clearInterval(intervalId);
  }, [fullPlaceholder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/images/search?q=${searchQuery}`); // Arama sonuç sayfasına yönlendiriyoruz
    }
  };

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <input
        className={classes.input}
        placeholder={placeholderText}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}
