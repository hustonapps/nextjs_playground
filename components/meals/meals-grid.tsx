import classes from "./meals-grid.module.scss";
import MealItem from "./meal-item";
import { MealItem as MealItemProps } from "./types";

interface MealsGridProps {
  meals: MealItemProps[];
}

export default function MealsGrid({ meals }: Readonly<MealsGridProps>) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.meal_id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
