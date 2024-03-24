"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ImagePickerProps {
  label: string;
  name: string;
  errorMessage?: string | null | undefined;
}

export default function ImagePicker({
  label,
  name,
  errorMessage = "",
}: Readonly<ImagePickerProps>) {
  const [pickedImage, setPickedImage] = useState<
    string | ArrayBuffer | StaticImport | null
  >();

  const imageInput = useRef<null | HTMLInputElement>(null);

  const onClickPickImage = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files?.[0]) {
      setPickedImage(null);
      return;
    }
    const file = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label
        className={`${classes.label} ${
          errorMessage ? classes.error : undefined
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <div className={classes.controls}>
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        <div
          className={`${classes.preview} ${
            errorMessage ? classes.error : undefined
          }`}
        >
          {!!pickedImage ? (
            <Image
              src={pickedImage as StaticImport}
              fill
              alt="image selected by user"
            />
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
