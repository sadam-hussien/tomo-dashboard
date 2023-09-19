import React from "react";

import { InputWithIcon } from "components";

import { useSearchParams } from "react-router-dom";

export default function Search({ placeholder }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="table-search">
      <InputWithIcon
        type="search"
        name="search"
        placeholder={placeholder}
        icon="las la-search"
        noBorder
        basic={{ onChange: (e) => setSearchParams({ search: e }) }}
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
