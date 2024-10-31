import ImageItem from "@/components/imageComp/image-item";
import SearchInput from "../search-input";
import classes from "../../../components/imageComp/image-grid.module.css";
import SearchSort from "./search-sort";

export default function SearchGrid({ images }) {
  if (images.length > 0) {
    return (
      <>
        <SearchInput />
        <SearchSort />
        <ul className={classes.images}>
          {images.map((image, index) => (
            <li key={index}>
              <ImageItem {...image} />
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <SearchInput />
        <div className={classes.notFound}>
          <p>images not found</p>
        </div>
      </>
    );
  }
}
