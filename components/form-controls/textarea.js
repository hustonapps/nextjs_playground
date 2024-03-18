import classes from "./textarea.module.css";

export default function TextArea({ name, label, required = true, rows = 10 }) {
  return (
    <p>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={classes.textarea}
        id={name}
        name={name}
        rows={rows}
        required={required}
      ></textarea>
    </p>
  );
}
