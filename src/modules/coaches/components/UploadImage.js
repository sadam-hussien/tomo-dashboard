import { Spinner } from "react-bootstrap";

export default function UploadImage({ files, deleteFile, isLoading }) {
  return (
    <div className="d-flex align-items-center gap-5 subscription-upload-img mb-xl">
      <div className="position-relative">
        <img
          src={
            files
              ? typeof files === "string"
                ? files
                : window.URL.createObjectURL(files)
              : "/assets/images/placholder.png"
          }
          alt="placholder"
          className="img-fluid subscription-upload-img-img"
        />
        {isLoading && (
          <>
            <div className="position-absolute overlay-when-uploading-image d-flex align-items-center justify-content-center">
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            </div>
          </>
        )}
      </div>

      <div>
        <div className="cursor-pointer bg-transparent border-0 p-0 d-flex align-items-center gap-4 mb-xl">
          <span className="btn-icon">
            <img
              src="/assets/images/camera-outline-icon.svg"
              alt="camera"
              className="img-fluid"
            />
          </span>
          <h5 className="btn-text m-0">رفع صورة</h5>
        </div>
        <button
          type="button"
          className="cursor-pointer bg-transparent border-0 p-0 d-flex align-items-center gap-4"
          onClick={deleteFile}
        >
          <span className="btn-icon">
            <img
              src="/assets/images/trash-icon-2.svg"
              alt="camera"
              className="img-fluid"
            />
          </span>
          <h5 className="btn-text m-0">حذف</h5>
        </button>
      </div>
    </div>
  );
}
