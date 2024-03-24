"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function validateIsRequired(text: string | FormDataEntryValue) {
  return `${text}`?.trim() ? null : "Field is required";
}

export async function shareMeal(
  _: Record<string, unknown>,
  formData: FormData
) {
  const entries = Object.fromEntries(formData);
  const meal = {
    title: entries.title,
    summary: entries.summary,
    instructions: entries.instructions,
    image: entries["new-image"],
    creator: entries.name,
    creator_email: entries.email,
  };

  if (
    validateIsRequired(meal.title) ||
    validateIsRequired(meal.summary) ||
    validateIsRequired(meal.instructions) ||
    validateIsRequired(meal.creator) ||
    validateIsRequired(meal.creator_email) ||
    !`${meal.creator_email}`.includes("@") || // quick hacky email validation for now
    !meal.image ||
    (meal.image as File).size === 0
  ) {
    return {
      title: validateIsRequired(meal.title),
      summary: validateIsRequired(meal.summary),
      instructions: validateIsRequired(meal.instructions),
      name: validateIsRequired(meal.creator),
      email:
        validateIsRequired(meal.creator_email) ||
        !`${meal.creator_email}`.includes("@")
          ? "Please enter a valid email"
          : null,
      image: (meal.image as File).size === 0 ? "Please select an image" : null,
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals", "page");
  redirect("/meals");
}
