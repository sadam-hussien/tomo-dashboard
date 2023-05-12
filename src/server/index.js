import Api from "server/axios";

export const apiLogout = () => {
  return Api().post("coaches/logout");
};
