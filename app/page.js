import ImageSlider from "@/components/images/image-slider";
import classes from "./page.module.css";
import Link from "next/link";
import MainInput from "@/components/main-input/main-input";

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlider />
        </div>
        <div>
          <div className={classes.side}>
            <h1>Free Images For Everyone</h1>
            <p>Research/share images that you like</p>
          </div>
          <div className={classes.desc}>
            <Link href="/images">Search images</Link>
            <Link href="/share">Share your images</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2 style={{ marginBottom: "20px" }}>Search Images</h2>
          <MainInput />
        </section>
        <section className={classes.section}>
          <h2>What we provide?</h2>
          <p>
            We provide free unlimited image library for users. Users can
            download images and share their favorite images with the world. It's
            a place to find new photos that users want and share them to the
            world.
          </p>
          <p>
            Before share your images, pick your image , submit the form and
            accept the user term.
          </p>
        </section>
        <section className={classes.section}>
          <h2>Why Share Your Images?</h2>
          <p>
            We provides convenience to users around the world. You can use it
            for business, homework, school project, etc..
          </p>
        </section>
      </main>
    </>
  );
}
