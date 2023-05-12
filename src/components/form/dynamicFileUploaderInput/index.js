import React from "react";

import { useFormikContext } from "formik";

export default function DynamicFileUploaderInput({ item, children }) {
  const { setFieldValue, values } = useFormikContext();

  const deleteFile = (index) => {
    if (item.multiple) {
      const filterItems = values[item.name].filter(
        (item, idx) => idx !== index
      );
      setFieldValue(item.name, filterItems);
    } else {
      setFieldValue(item.name, "");
    }
  };

  const handleChildren = React.cloneElement(children, {
    files: values[item.name],
    deleteFile,
  });

  return (
    <>
      <div className="position-relative dynamic-file-uploader-input">
        <input
          {...item?.inputProps}
          type="file"
          id={item.id}
          name={item.name}
          className="d-none"
          onChange={(e) => {
            if (item.multiple) {
              setFieldValue(item.name, [
                ...values[item.name],
                ...e.target.files,
              ]);
            } else {
              setFieldValue(item.name, e.target.files[0]);
            }
          }}
        />
        <label htmlFor={item.id} className="w-100">
          {handleChildren}
        </label>
      </div>
    </>
  );
}
