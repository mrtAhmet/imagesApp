import SelectImage from "./select-image";

async function getImage(id) {
  const response = await fetch(
    `http://localhost:3000/api/selectImage?id=${id}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Veri alınamadı");
  }
  return response.json();
}

export default async function Filter({ searchParams }) {
  const params = await searchParams;
  const image = await getImage(params.id);
  return <SelectImage image={image} />;
}
