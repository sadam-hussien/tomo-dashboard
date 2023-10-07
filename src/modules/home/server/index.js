import Api from "server/axios";

export const apiGetDashboard = () => {
  return Api().get("users/allProfile");
};
