import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const rando = Math.floor(Math.random() * 10);
  if (rando % 5 === 0) {
    throw new Error("loading meals failed");
  }
  return db.prepare("SELECT * FROM Meals").all();
}

export function getMeal(id) {
  return db.prepare("SELECT * FROM Meals WHERE meal_id = ?").get(id);
}

export async function saveMeal(data) {
  const { image, ...meal } = data;
  meal.meal_id = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = image.name.split(".").pop();
  const fileName = `${meal.meal_id}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("saving image failed");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, meal_id)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @meal_id)
  `
  ).run(meal);
}
