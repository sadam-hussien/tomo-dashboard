import Api from "server/axios";

export const apiGetCoaches = (params) => {
  return Api().get("coaches", {
    params,
  });
};

export const apiGetSingleCoache = (params) => {
  return Api().get("coaches/coach", {
    params,
  });
};

export const apiAddCoache = (data) => {
  return Api().post("coaches", data);
};

export const apiEditCoache = (data) => {
  return Api().put("coaches/coach", data);
};

export const apiDeleteCoache = (id) => {
  return Api().delete(`coaches?id=${id}`);
};

export const apiGetPrograms = (params) => {
  return Api().get("programs", {
    params: params,
  });
};
