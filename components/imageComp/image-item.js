"use client";

import Image from "next/image";
import classes from "./image-item.module.css";
import Link from "next/link";
import Like from "./like";
import { useRouter } from "next/navigation";

export default function ImageItem({
  ID,
  username,
  title,
  tags,
  imageURL,
  imageDesc,
  uploadTime,
  likeCount: initialLikeCount, // Değeri prop olarak alıyoruz
}) {
  const router = useRouter();
  const tagList = tags.split(",");

  const displayUploadTime = Array.isArray(uploadTime)
    ? new Date(uploadTime[0]).toLocaleDateString()
    : new Date(uploadTime).toLocaleDateString();

  function handlePush(tag) {
    setTimeout(() => {
      router.push(`http://localhost:3000/images/tagSearch?tag=${tag}`);
    }, 0);
  }

  return (
    <article className={classes.image}>
      <header>
        <div className={classes.item}>
          <Image src={imageURL} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {username}</p>
          <div className={classes.descDetails}>
            <Like ID={ID} initialLikeCount={initialLikeCount} />
          </div>
          <p>Upload date: {displayUploadTime}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.tags}>
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
        <div className={classes.actions}>
          <Link href={`/images/select?id=${ID}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
