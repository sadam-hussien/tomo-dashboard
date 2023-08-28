import Api from "server/axios";

export const apiGetCoaches = () => {
  return Api().get("coaches");
};

export const apiAddCoache = (data) => {
  return Api().post("coaches", data);
};

export const apiEditCoache = (data) => {
  return Api().put("coaches/coach", data);
};

export const apiDeleteCoache = (id) => {
  return Api().delete(`coaches/${id}`);
};

export const apiGetPrograms = (params) => {
  return Api().get("programs", {
    params: params,
  });
};