"use client";
import classes from "./error.module.css";

export default function MealsError() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <main className="error">
      <h1>An error occurred</h1>
      <p>
        Failed to fetch meals data,{" "}
        <span className={classes.refresh} onClick={refreshPage}>
          refresh
        </span>{" "}
        the page
      </p>
    </main>
  );
}
