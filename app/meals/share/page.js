import ImagePicker from "@/components/meals/image-picker";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import TextField from "@/components/form-controls/text-field";
import TextArea from "@/components/form-controls/textarea";
import classes from "./page.module.css";
import { shareMeal } from "@/server/action";

const { header, highlight, main, form, row, actions } = classes;

export default function ShareMealPage() {
  return (
    <>
      <header className={header}>
        <h1>
          Share your <span className={highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={main}>
        <form className={form} action={shareMeal}>
          <div className={row}>
            <TextField name="name" label="Your name" />
            <TextField name="email" label="Your email" />
          </div>
          <TextField name="title" label="Title" />
          <TextField name="summary" label="Short Summary" />
          <TextArea name="instructions" label="Instructions" />
          <ImagePicker label="New Image" name="new-image" />
          <p className={actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
