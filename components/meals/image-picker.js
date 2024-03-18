"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);

  const imageInput = useRef();

  const onClickPickImage = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (e) => {
    const [file] = e.target.files;
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!!pickedImage ? (
            <Image src={pickedImage} fill alt="image selected by user" />
          ) : (
            "No image picked"
          )}
        </div>
        <input
          required
          type="file"
          className={classes.input}
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={onClickPickImage}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
