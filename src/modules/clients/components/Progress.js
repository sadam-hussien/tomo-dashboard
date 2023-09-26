import React from "react";

export default function Progress({ image, value, title }) {
  return (
    <div className="single-client-radial-progress">
      <div className="single-client-radial-progress-progress-bar position-relative">
        <svg
          className="single-client-radial-progress-progress"
          x="0px"
          y="0px"
          viewBox="0 0 80 80"
        >
          <path
            className="track"
            d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
          />
          <path
            className="fill"
            style={{
              strokeDashoffset: ((100 - value) / 100) * -219.99078369140625,
            }}
            d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
          />
        </svg>

        <div className="position-absolute single-client-radial-progress-desc d-flex flex-column align-items-center justify-content-center">
          <img src={`/assets/images/${image}`} className="img-fluid" />
          <h4 className="single-client-radial-progress-desc-value">{value}</h4>
          <h5 className="single-client-radial-progress-desc-title">{title}</h5>
        </div>
      </div>
    </div>
  );
}
