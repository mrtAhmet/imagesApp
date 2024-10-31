"use client";

import { IoMdClose } from "react-icons/io";
import Like from "@/components/imageComp/like";
import classes from "./select.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SelectImage({ image }) {
  const router = useRouter();
  const tagList = image[0].tags.split(",");

  const displayUploadTime = Array.isArray(image[0].uploadTime)
    ? new Date(image[0].uploadTime[0]).toLocaleDateString()
    : new Date(image[0].uploadTime).toLocaleDateString();

  console.log(image);

  function handleGoBack() {
    router.back();
  }

  function handlePush(tag) {
    setTimeout(() => {
      router.push(`http://localhost:3000/images/tagSearch?tag=${tag}`);
    }, 0);
  }

  return (
    <div className={classes.selectMain}>
      <div className={classes.imageContainer}>
        <Image
          src={image[0].imageURL}
          alt={image[0].imageDesc}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={classes.selectSide}>
        <div className={classes.selectClose}>
          <button>
            <IoMdClose onClick={handleGoBack} />
          </button>
        </div>
        <div className={classes.selectEnd}>
          <div className={classes.selectTitle}>
            <h1>{image[0].title}</h1>
            <p>Upload by : {image[0].username}</p>
          </div>
          <hr style={{ width: "100%" }} />
          <div className={classes.content}>
            <h2>{image[0].imageDesc}</h2>
            <p>
              {tagList.map((tag, index) => (
                <label
                  key={index}
                  className={classes.tagLabel}
                  onClick={() => handlePush(tag)}
                >
                  #{tag}{" "}
                </label>
              ))}
            </p>
          </div>
          <div className={classes.endContent}>
            <p>Upload date : {displayUploadTime}</p>
            <div className={classes.like}>
              <Like ID={image[0].ID} initialLikeCount={image[0].likeCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
