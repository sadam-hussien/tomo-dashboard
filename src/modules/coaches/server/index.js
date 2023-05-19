import Api from "server/axios";

export const apiGetCoaches = () => {
  return Api().get("coaches");
};

export const apiAddCoache = (data) => {
  return Api().post("coaches", data);
};

export const apiEditCoache = (data) => {
  return Api().put("coaches", data);
};

export const apiDeleteCoache = (data) => {
  return Api().delete("coaches", data);
};
