import ImageGrid from "@/components/imageComp/image-grid";
import { getImages } from "@/pages/api/getImages";

import { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import SearchInput from "./search-input";

async function Images() {
  const images = await getImages();

  return <ImageGrid images={images} />;
}

export default function () {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Perfect images, shared{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Search your favorite images and download for using wallpaper , profile
          picture etc...
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching images...</p>}
        >
          <div className={classes.mainDiv}>
            <SearchInput />
          </div>
          <div className={classes.listTitle}>
            <h1>Recently Added Images</h1>
            <hr className={classes.hr} />
          </div>
          <Images />
        </Suspense>
      </main>
    </>
  );
}
