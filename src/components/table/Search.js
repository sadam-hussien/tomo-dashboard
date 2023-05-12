import React from "react";

import { InputWithIcon } from "components";

export default function Search({ searchPlaceholder, search, setSearch }) {
  return (
    <div className="table-search">
      <InputWithIcon
        type="search"
        name="search"
        placeholder={searchPlaceholder}
        icon="las la-search"
        noBorder
        basic={{ value: search || undefined, onChange: (e) => setSearch(e) }}
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
