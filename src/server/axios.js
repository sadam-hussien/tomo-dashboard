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
      return Promise.reject(error.response);
    }
  );

  return appClient;
}
