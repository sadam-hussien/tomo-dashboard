import React from "react";

import { Btn } from "components";

export default function FormSubmit({ title, loading }) {
  return (
    <div className="auth-submit">
      <Btn
        title={title}
        loading={loading}
        style={{
          minWidth: "100%",
          height: "68px",
          fontSize: "var(--font-size-lg)",
          fontWeight: "700",
        }}
      />
    </div>
  );
}
