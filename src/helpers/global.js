export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export function handleDate(d, time = null) {
  if (time) {
    const date = new Date(d);
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    const minutes =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    return `${hours}:${minutes}`;
  }
  if (d) {
    const date = new Date(d);
    const days = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    const minutes =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    return `${days} ${month} ${year}`;
  }
}

export function getWebsoketToken() {
  return localStorage.getItem("websocket_token");
}

export function saveWebsoketToken(token) {
  return localStorage.setItem("websocket_token", token);
}

export function removeWebsoketToken() {
  return localStorage.removeItem("websocket_token");
}
