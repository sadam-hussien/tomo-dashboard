import Api from "server/axios";

export const apiGetProfile = () => {
  return Api().get(`coaches/current-coach`);
};

export const apiUpdateCoachData = (data) => {
  return Api().put(`coaches`, data);
};

export const apiUpdatePassword = (data) => {
  return Api().put(`coaches/updatePassword`, data);
};
