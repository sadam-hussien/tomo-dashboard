import React from "react";

import { Button, Spinner } from "react-bootstrap";

export default function Btn({
  variant = "primary",
  type = "submit",
  loading,
  title,
  style,
  radius,
  onClick,
  disabled,
  as,
  classes,
  children,
}) {
  return (
    <Button
      as={as}
      variant={variant}
      className={`text-capitalize ${classes} normal-btn position-relative d-flex align-items-center justify-content-center gap-2`}
      type={type}
      disabled={disabled || loading}
      style={style}
      onClick={onClick}
    >
      {!loading ? (
        title ? (
          title
        ) : (
          children
        )
      ) : (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </Button>
  );
}
