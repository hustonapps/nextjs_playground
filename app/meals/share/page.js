"use client";
import { useFormState } from "react-dom";
import ImagePicker from "@/components/meals/image-picker";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import TextField from "@/components/form-controls/text-field";
import TextArea from "@/components/form-controls/textarea";
import classes from "./page.module.css";
import { shareMeal } from "@/server/action";

const { header, highlight, main, form, row, actions } = classes;

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, {
    title: "",
    summary: "",
    instructions: "",
    name: "",
    email: "",
    iamge: "",
  });
  return (
    <>
      <header className={header}>
        <h1>
          Share your <span className={highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={main}>
        <form className={form} action={formAction} noValidate>
          <div className={row}>
            <TextField
              name="name"
              label="Your name"
              errorMessage={state.name}
            />
            <TextField
              name="email"
              label="Your email"
              errorMessage={state.email}
            />
          </div>
          <TextField name="title" label="Title" errorMessage={state.title} />
          <TextField
            name="summary"
            label="Short Summary"
            errorMessage={state.summary}
          />
          <TextArea
            name="instructions"
            label="Instructions"
            errorMessage={state.instructions}
          />
          <ImagePicker
            label="New Image"
            name="new-image"
            errorMessage={state.image}
          />
          <p className={actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
