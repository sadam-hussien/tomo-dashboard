import { io } from "socket.io-client";

import { getWebsoketToken } from "helpers";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://tomo-api.onrender.com"
    : "https://tomo-api.onrender.com";

const socket = new io(URL, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  extraHeaders: {
    access_token: getWebsoketToken(),
  },
});

export default socket;
