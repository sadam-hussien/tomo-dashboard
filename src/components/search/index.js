import React from "react";

import { InputWithIcon } from "components";

export default function Search({ placeholder }) {
  return (
    <div className="table-search">
      <InputWithIcon
        type="search"
        name="search"
        placeholder={placeholder}
        icon="las la-search"
        noBorder
        basic={{ onChange: (e) => console.log(e) }}
        containerStyle={{
          backgroundColor: "var(--natu)",
          marginBottom: "0",
          flexDirection: "row-reverse",
        }}
        style={{
          height: "40px",
        }}
      />
    </div>
  );
}
