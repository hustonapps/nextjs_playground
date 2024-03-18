import classes from "./text-field.module.css";

export default function TextField({
  name,
  label,
  type = "text",
  required = true,
  errorMessage = "",
}) {
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
      <input
        className={`${classes.textField} ${
          errorMessage ? classes.error : undefined
        }`}
        type={type}
        id={name}
        name={name}
        required={required}
      />
      {errorMessage && <p className={classes.error}>{errorMessage}</p>}
    </p>
  );
}
