import React from "react";

export default function ImageAndName({ img, title, subtitle }) {
  return (
    <div className="d-flex align-items-center gap-3 table-image-and-name">
      <img src={img} alt={title} className="img-fluid" />
      <div>
        <h6 className="table-image-and-name-title text-capitalize">{title}</h6>
        {subtitle && (
          <span className="table-image-and-name-subtitle">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
