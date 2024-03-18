import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const rando = Math.floor(Math.random() * 10);
  if (rando % 5 === 0) {
    throw new Error("loading meals failed");
  }
  return db.prepare("SELECT * FROM Meals").all();
}
