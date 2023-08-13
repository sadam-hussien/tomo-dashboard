import { Form, Formik } from "formik";

import SelectBox from "../form/selectBox";

import { FilterOption } from "components";

export default function Filteer({ selectActionProps, placeholder, label }) {
  return (
    <Formik initialValues={{ [selectActionProps?.name]: "" }}>
      {() => (
        <Form className="form-select-w-100">
          <SelectBox
            item={{
              ...selectActionProps,
              props: {
                components: { Option: FilterOption },
              },
            }}
            placeholder={placeholder}
            label={label}
            onChange={(e) => console.log("select", e)}
            containerStyle={{
              marginBottom: 0,
              boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Form>
      )}
    </Formik>
  );
}
