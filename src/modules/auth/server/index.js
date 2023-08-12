import Api from "server/axios";

export const apiLogin = (data) => {
  return Api().post("coaches/login", data);
};
