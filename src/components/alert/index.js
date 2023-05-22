import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

import Confirmation from "./Confirmation";

const MySwal = withReactContent(Swal);

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
export function alertConfirmation({ mutate, id }) {
  MySwal.fire({
    html: <Confirmation swal={MySwal} mutate={mutate} id={id} />,
    showConfirmButton: false,
    allowOutsideClick: false,
    icon: "warning",
  });
}

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
