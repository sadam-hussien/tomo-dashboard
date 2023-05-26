import Api from "server/axios";

export const apiUpdatePassword = (data) => {
  return Api().put(`coaches/updatePassword`, data);
};
