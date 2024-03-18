import classes from "./text-field.module.css";

export default function TextField({
  name,
  label,
  type = "text",
  required = true,
}) {
  return (
    <p>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={classes.textField}
        type={type}
        id={name}
        name={name}
        required={required}
      />
    </p>
  );
}
