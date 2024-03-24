import Link from "next/link";
import Image from "next/image";
import { MealItem as MealItemProps } from "./types";

import classes from "./meal-item.module.css";

export default function MealItem({
  title,
  meal_id,
  image,
  summary,
  creator,
}: Readonly<MealItemProps>) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${meal_id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
