import axios from "axios";

import store from "store";

export default function Api() {
  const {
    auth: { user },
  } = store.getState();
  const appClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${user ? user.token : null}`,
      Accept: "application/json",
      ContentType: "application/json",
      "Accept-Language": "en",
      "Content-Language": "en",
    },
  });
  appClient.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response.data.errors) {
        if (
          ["غير مصرح لك بالدخول", "unauthorized"].includes(
            error.response.data?.errors[0].toLowerCase()
          )
        ) {
          localStorage.removeItem("persist:auth");
          localStorage.removeItem("websoket_token");
          window.location.reload();
        }
        return Promise.reject(error.response);
      }
      return Promise.reject(error.response);
    }
  );

  return appClient;
}
