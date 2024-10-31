import SearchGrid from "../search/search-grid";

async function getTags(tag, sort) {
  const response = await fetch(
    `http://localhost:3000/api/tags?tag=${tag}&sort=${sort}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Veri alınamadı");
  }
  return response.json();
}
export default async function SearchTag({ searchParams }) {
  const params = await searchParams;
  const images = await getTags(params.tag, params.sort);
  return <SearchGrid images={images} />;
}
