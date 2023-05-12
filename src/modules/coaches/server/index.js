import Api from "server/axios";

export const apiGetCoaches = () => {
  return Api().get("coaches");
};
