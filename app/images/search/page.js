import SearchGrid from "./search-grid";

async function getImages(searchQuery, sortOption) {
  const res = await fetch(
    `http://localhost:3000/api/images?q=${searchQuery}&sort=${sortOption}`,
    {
      cache: "no-store", // Cache'i devre dışı bırak
    }
  );

  if (!res.ok) {
    throw new Error("Veri alınamadı.");
  }

  return res.json();
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const images = await getImages(params.q, params.sort || "new"); // 'sort' parametresini al
  return <SearchGrid images={images} />;
}
