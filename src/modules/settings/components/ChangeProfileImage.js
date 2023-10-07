export default function ChangeProfileImage({ files, deleteFile }) {
  return (
    <div className="d-flex align-items-center gap-5 profile-page-change-image">
      <img
        onClick={(e) => e.preventDefault()}
        src={
          files
            ? typeof files === "string"
              ? files
              : window.URL.createObjectURL(files)
            : "/assets/images/placholder.png"
        }
        alt="placholder"
        className="img-fluid profile-page-change-image-img"
      />

      <div className="d-flex align-items-center gap-5">
        <div className="cursor-pointer bg-transparent">
          <h5 className="btn-text m-0 text-danger">تغيير</h5>
        </div>
        <button
          type="button"
          className="cursor-pointer bg-transparent border-0 p-0"
          onClick={deleteFile}
        >
          <h5 className="btn-text m-0">حذف</h5>
        </button>
      </div>
    </div>
  );
}
