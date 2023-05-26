import { CheckBoxInput } from "components";
import { Form, Formik } from "formik";

export default function MealCheck({ title, checked, ...props }) {
  return (
    <div className="d-flex align-items-center gap-4">
      <span className="meal-title">{title}</span>
      <Formik
        initialValues={{
          meal: checked,
        }}
      >
        {() => (
          <Form>
            <CheckBoxInput name="meal" value={checked} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
