"use client";

import share from "@/public/slider-images/sharewith.jpg";
import research from "@/public/slider-images/rigby.jpg";

import classes from "./image-slider.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { image: share, alt: "Share your images" },
  { image: research, alt: "Resarch photos for you" },
];

export default function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
          layout="fill"
        />
      ))}
    </div>
  );
}
