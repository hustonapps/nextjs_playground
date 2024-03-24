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

export function getMeal(id: string) {
  return db.prepare("SELECT * FROM Meals WHERE meal_id = ?").get(id);
}

type FormSubmitData = {
  title: FormDataEntryValue;
  summary: FormDataEntryValue;
  instructions: FormDataEntryValue;
  image: FormDataEntryValue;
  creator: FormDataEntryValue;
  creator_email: FormDataEntryValue;
};

type FormSaveData = {
  title: string;
  summary: string;
  instructions: string;
  image: string;
  creator: string;
  creator_email: string;
  meal_id: string;
};

async function transformForSave(data: FormSubmitData): Promise<FormSaveData> {
  const { image, ...meal } = data;

  const newId = slugify(`${meal.title}`, { lower: true });

  const extension = (image as File).name.split(".").pop();
  const fileName = `${newId}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await (image as File).arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("saving image failed");
    }
  });

  const newMeal: FormSaveData = {
    meal_id: newId,
    instructions: xss(`${meal.instructions}`),
    image: `/images/${fileName}`,
    summary: `${meal.summary}`,
    creator: `${meal.creator}`,
    creator_email: `${meal.creator_email}`,
    title: `${meal.title}`,
  };
  return newMeal;
}

export async function saveMeal(data: FormSubmitData) {
  const meal = await transformForSave(data);
  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, meal_id)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @meal_id)
  `
  ).run(meal);
}
