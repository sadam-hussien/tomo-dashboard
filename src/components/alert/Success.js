// import React from "react";

// import Lottie from "react-lottie";

// import lottieSuccess from "assets/lottie/success.json";

// import { ButtonWithIcon } from "components";

// export default function Success({ title, subtitle, swal }) {
//   return (
//     <div className="confimation-alert">
//       <Lottie
//         options={{
//           loop: false,
//           autoplay: true,
//           animationData: lottieSuccess,
//           rendererSettings: {
//             preserveAspectRatio: "xMidYMid slice",
//           },
//         }}
//         style={{ maxHeight: 350, maxWidth: 350 }}
//       />
//       <h2 className="confimation-alert-title">{title}</h2>
//       <h4 className="confimation-alert-desc m-0 text-capitalize">{subtitle}</h4>
//       <div className="confimation-alert-btns d-flex align-items-center justify-content-center">
//         <ButtonWithIcon
//           title="ok"
//           icon="las la-check"
//           onClick={() => swal.clickConfirm()}
//         />
//       </div>
//     </div>
//   );
// }
