export default function SlugItem({ image }) {
  console.log(image.title);
  return (
    <>
      <p>the car is</p>
      <p>{image.title}</p>
      <div>
        <img src={image.imageURL} alt="" />
      </div>
      <p>{image.imageDesc}</p>
    </>
  );
}
