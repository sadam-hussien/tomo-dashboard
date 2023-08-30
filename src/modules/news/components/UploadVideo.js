import { Spinner } from "react-bootstrap";

export default function UploadVideo({ files, deleteFile, isLoading }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-5 subscription-upload-img mb-xl v cursor-pointer bg-light p-4 rounded">
      <div className="d-flex flex-column align-items-center">
        <img
          src={
            files
              ? typeof files === "string"
                ? files
                : window.URL.createObjectURL(files)
              : "/assets/images/camera.svg"
          }
          alt="placholder"
          className="img-fluid subscription-upload-img-img"
        />
        <span>ارفاق صورة او عدة صور</span>
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
    </div>
  );
}
