import React, { forwardRef, useEffect, useRef } from "react";

const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return (
    <div>
      <label className="table-custom-checkbox-label">
        <input className="d-none" type="checkbox" ref={resolvedRef} {...rest} />
        <div className="table-custom-checkbox d-flex align-items-center justify-content-center">
          <i className="las la-check icon"></i>
        </div>
      </label>
    </div>
  );
});
export default Checkbox;
