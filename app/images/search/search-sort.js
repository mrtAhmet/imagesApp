import classes from "../../../components/imageComp/image-grid.module.css";
import SearchList from "./search-list";

export default function SearchSort() {
  return (
    <div className={classes.sortGrid}>
      <div>
        <label>Sort by : </label>
      </div>
      <SearchList />
    </div>
  );
}
