import classes from "./textarea.module.css";

interface TextAreaProps {
  name: string;
  label: string;
  errorMessage?: string | null | undefined;
  required?: boolean;
  rows?: number;
}

export default function TextArea({
  name,
  label,
  errorMessage = "",
  required = true,
  rows = 10,
}: Readonly<TextAreaProps>) {
  return (
    <p>
      <label
        className={`${classes.label} ${
          errorMessage ? classes.error : undefined
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        className={`${classes.textarea} ${
          errorMessage ? classes.error : undefined
        }`}
        id={name}
        name={name}
        rows={rows}
        required={required}
      ></textarea>
      {errorMessage && <p className={classes.error}>{errorMessage}</p>}
    </p>
  );
}
