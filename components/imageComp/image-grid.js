import classes from "./image-grid.module.css";
import ImageItem from "./image-item";

export default function ImageGrid({ images }) {
  return (
    <ul className={classes.images}>
      {images.map((image, index) => (
        <li key={index}>
          <ImageItem {...image} />
        </li>
      ))}
    </ul>
  );
}
