import React from "react";
import { Spinner } from "react-bootstrap";

export default function ImageUploaderPreview(props) {
  console.log("props", props);
  return (
    <div className="image-uploader-preview">
      {!props.files.length ? (
        <div className="image-uploader-preview-box d-flex flex-column align-items-center justify-content-center">
          <img
            src="/assets/images/camera.svg"
            alt="camera"
            className="img-fluid"
          />
          <h6 className="image-uploader-preview-label mb-0">
            {props?.label || "ارفاق صوره او عدة صور"}
          </h6>
        </div>
      ) : (
        <div className="w-100 d-flex flex-wrap image-uploader-preview-image-items">
          {props.files.map((file, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {typeof file === "string" ? (
                <ImageItem {...props} url={file} index={index} />
              ) : (
                <ImageItem
                  {...props}
                  url={window.URL.createObjectURL(file)}
                  index={index}
                />
              )}
            </div>
          ))}

          {props.multiple && (
            <div className="image-uploader-preview-box d-flex flex-column align-items-center justify-content-center">
              <img
                src="/assets/images/camera.svg"
                alt="camera"
                className="img-fluid"
              />
              <h6 className="image-uploader-preview-label mb-0">
                {props?.label || "ارفاق صوره او عدة صور"}
              </h6>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ImageItem(props) {
  return (
    <div className="position-relative image-uploader-preview-image-item">
      <img src={props.url} alt="" className="img-fluid" />
      <button
        type="button"
        className="image-uploader-preview-image-item-delete d-flex align-items-center justify-content-center"
        onClick={() => props.deleteFile(props.index)}
      >
        <img
          src="/assets/images/trash_icon.svg"
          alt="trash"
          className="img-fluid"
        />
      </button>

      {props.isLoading && (
        <div className="image-uploader-preview-image-item-loading d-flex align-items-center justify-content-center">
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
