import { Formik, Form, Field, type FormikHelpers } from "formik";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

interface SearchFormValues {
  query: string;
}

const initialValues: SearchFormValues = {
  query: "",
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>
  ) => {
    if (values.query === "") {
      toast.error("Please enter your search query.");
      actions.setSubmitting(false);
      return;
    }
    onSubmit(values.query);
    actions.resetForm();
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                className={css.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={css.button} type="submit">
                Search
              </button>
            </Form>
          </Formik>
        </div>
      </header>
    </>
  );
}
