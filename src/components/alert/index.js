// import React from "react";

// import Confirmation from "./Confirmation";

// import Success from "./Success";

// import Error from "./Error";

// // alerts
import Swal from "sweetalert2";

// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

export function Toast({
  position = "top-end",
  confirmButton = false,
  timer = 3000,
  timerProgressBar = true,
  icon,
  title,
}) {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: confirmButton,
    timer,
    timerProgressBar,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon,
    title,
  });
}

// // alert confirmation
// export function alertConfirmation({
//   actions,
//   title = "Be Carefull!",
//   subtitle = "Are you sure you want to delete?",
//   name,
// }) {
//   MySwal.fire({
//     html: (
//       <Confirmation
//         title={title}
//         subtitle={subtitle}
//         swal={MySwal}
//         actions={actions}
//         name={name}
//       />
//     ),
//     showConfirmButton: false,
//     allowOutsideClick: false,
//   });
// }

// // alert successfully
// export function alertSuccess({ title = "Good Job!", subtitle = "ok done" }) {
//   MySwal.fire({
//     html: <Success title={title} subtitle={subtitle} swal={MySwal} />,
//     showConfirmButton: false,
//   });
// }

// // alert error
// export function alertError({ title = "Oops!", subtitle = "error ocured" }) {
//   MySwal.fire({
//     html: <Error title={title} subtitle={subtitle} swal={MySwal} />,
//     showConfirmButton: false,
//   });
// }
