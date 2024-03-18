"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(formData) {
  const entries = Object.fromEntries(formData);
  const meal = {
    title: entries.title,
    summary: entries.summary,
    instructions: entries.instructions,
    image: entries["new-image"],
    creator: entries.name,
    creator_email: entries.email,
  };

  await saveMeal(meal);
  redirect("/meals");
}
