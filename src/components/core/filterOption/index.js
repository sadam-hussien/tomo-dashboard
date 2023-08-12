// for custom select box options
import { components } from "react-select";

import { CheckBoxInput } from "components";

export default function FilterOption(props) {
  return (
    <components.Option {...props}>
      <div
        className="d-flex align-items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <CheckBoxInput
          id={props.data.value}
          name="filter"
          label={props.data.label}
          basic
          value={props.data.value}
          // style,
          // onChange,
        />
      </div>
    </components.Option>
  );
}
