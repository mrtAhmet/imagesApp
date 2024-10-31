"use client";

import { useState, useEffect } from "react";
import classes from "./search-list.module.css";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchList() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Mevcut URL parametrelerini almak için
  const pathname = usePathname(); // Geçerli yolu al

  const [selectedOption, setSelectedOption] = useState(
    searchParams.get("sort") || "new"
  );

  // Mevcut arama terimini al (q veya tag parametresine göre)
  const currentSearchTerm =
    pathname === "/images/search"
      ? searchParams.get("q") || ""
      : searchParams.get("tag") || "";

  function handleSelectChange(e) {
    const sortOption = e.target.value;
    setSelectedOption(sortOption);

    // URL parametrelerine göre uygun yönlendirmeyi yap
    if (pathname === "/images/search") {
      router.push(`/images/search?q=${currentSearchTerm}&sort=${sortOption}`);
    } else if (pathname === "/images/tagSearch") {
      router.push(
        `/images/tagSearch?tag=${currentSearchTerm}&sort=${sortOption}`
      );
    }
  }

  return (
    <>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className={classes.select}
      >
        <option value="new">New</option>
        <option value="old">Old</option>
        <option value="most-liked">Most Liked</option>
      </select>
    </>
  );
}
