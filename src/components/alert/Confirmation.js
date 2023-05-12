// import React, { useState } from "react";

// import { Toast } from "./index";

// import Lottie from "react-lottie";

// import lottieConfirmation from "assets/lottie/confirmation.json";

// import { ButtonWithIcon, Btn } from "components";

// export default function Confirmation({
//   title,
//   subtitle,
//   swal,
//   actions: { mutate, items },
//   name,
// }) {
//   const [loading, setLoading] = useState(false);
//   const confirmationClick = () => {
//     if (items) {
//       setLoading(true);
//       mutate(items);
//     } else {
//       // alert no items selected
//       Toast({
//         icon: "info",
//         title: "please select items to delete",
//       });
//     }
//   };
//   return (
//     <div className="confimation-alert">
//       <Lottie
//         options={{
//           loop: false,
//           autoplay: true,
//           animationData: lottieConfirmation,
//           rendererSettings: {
//             preserveAspectRatio: "xMidYMid slice",
//           },
//         }}
//         style={{ maxHeight: 350, maxWidth: 350 }}
//       />
//       <h2 className="confimation-alert-title">{title}</h2>
//       <h4 className="confimation-alert-desc m-0">
//         {subtitle} {name}
//       </h4>
//       <div className="confimation-alert-btns d-flex align-items-center justify-content-center gap-4">
//         <ButtonWithIcon
//           title="yes, i want"
//           icon="las la-trash-alt"
//           style={{
//             minWidth: "150px",
//             backgroundColor: "var(--danger)",
//             borderColor: "var(--danger)",
//           }}
//           onClick={confirmationClick}
//           loading={loading}
//         />
//         <Btn
//           title="cancel"
//           onClick={() => swal.clickCancel()}
//           style={{
//             minWidth: "150px",
//           }}
//           disabled={loading}
//         />
//       </div>
//     </div>
//   );
// }
