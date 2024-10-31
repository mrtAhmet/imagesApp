"use client";

import { useActionState } from "react";

import { useState } from "react";
import classes from "./page.module.css";
import ImagePicker from "@/components/image-picker/image-picker";
import { shareImage } from "@/pages/actions/action";
import FormSubmit from "@/components/image-picker/form-submit";

export default function ShareImagePage() {
  const maxLength = 300;
  const [remaining, setRemaining] = useState(maxLength);
  const handleChange = (event) => {
    const inputText = event.target.value;
    setRemaining(maxLength - inputText.length);
  };
  const [state, formAction] = useActionState(shareImage, { message: null });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your images to the{" "}
          <span className={classes.highlight}>all users!</span>
        </h1>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div>
            <p>
              <label htmlFor="username">Your username</label>
              <input type="text" name="username" id="username" required />
            </p>
            <p>
              <label htmlFor="title">Image Title</label>
              <input type="text" name="title" id="title" required />
            </p>
            <p>
              <label htmlFor="tags">
                Image Tags{" "}
                <span className={classes.note}>
                  Note:Use comma ',' after tag example(car,sportcar)
                </span>
              </label>
              <input type="text" name="tags" id="tags" required />
            </p>
            <p>
              <label htmlFor="description">
                Description{" "}
                <span className={classes.note}>Max 300 characters</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="10"
                maxLength={300}
                onChange={handleChange}
                required
              ></textarea>
            </p>
            <div className={classes.small}>
              <small>Remaining characters : {remaining}</small>
            </div>
            <ImagePicker label="Your image" name="image" />
            {state.message && <p>{state.message}</p>}
            <p className={classes.actions}>
              <FormSubmit />
            </p>
          </div>
        </form>
      </main>
    </>
  );
}
