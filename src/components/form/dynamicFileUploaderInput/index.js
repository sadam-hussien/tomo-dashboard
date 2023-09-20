import React from "react";

import { ErrorMessage, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

export default function DynamicFileUploaderInput({
  item,
  children,
  serverCallback,
  currentValue,
}) {
  const { t } = useTranslation("validation");

  const { setFieldValue, values } = useFormikContext();

  const getValue = currentValue || values[item.name];

  function onChange(e) {
    if (item.multiple) {
      if (serverCallback) {
        const fd = new FormData();
        fd.append("image", e.target.files[0]);
        const lengthOfItems = getValue.length;
        setFieldValue(item.name, [...getValue, ...e.target.files]);
        serverCallback(fd, {
          onSuccess: (data) => {
            const oldValues = getValue;
            oldValues.splice(lengthOfItems, 1);
            setFieldValue(item.name, [...oldValues, data.data.path]);
          },
        });
      } else {
        setFieldValue(item.name, [...getValue, ...e.target.files]);
      }
    } else {
      // if there is server call back
      if (serverCallback) {
        const fd = new FormData();
        fd.append("image", e.target.files[0]);
        setFieldValue(item.name, e.target.files[0]);
        serverCallback(fd, {
          onSuccess: (data) => {
            setFieldValue(item.name, data.data.path);
          },
        });
      } else {
        setFieldValue(item.name, e.target.files[0]);
      }
    }
  }

  const deleteFile = (index) => {
    if (item.multiple) {
      const filterItems = getValue.filter((item, idx) => idx !== index);
      setFieldValue(item.name, filterItems);
    } else {
      setFieldValue(item.name, "");
    }
  };

  const handleChildren = React.cloneElement(children, {
    files: getValue,
    deleteFile,
  });

  return (
    <>
      <div className="dynamic-file-uploader-input">
        <input
          {...item?.inputProps}
          type="file"
          id={item.id}
          name={item.name}
          className="d-none"
          onChange={onChange}
        />
        <label htmlFor={item.id} className="w-100">
          {handleChildren}
        </label>
      </div>

      <ErrorMessage
        name={item.name}
        component="div"
        className="input-error-msg"
      >
        {(msg) => <div className="input-error-msg">{t(msg)}</div>}
      </ErrorMessage>
    </>
  );
}
