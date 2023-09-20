import Api from "server/axios";

export const apiGetUsers = (params) => {
  return Api().get("coaches/allUser", {
    params: params,
  });
};

export const apiDeleteUser = (id) => {
  return Api().delete(`coaches/?id=${id}`);
};

export const apiAddUser = (data) => {
  return Api().post(`coaches/addUser`, data);
};

export const apiEditUser = (data) => {
  return Api().put(`coaches/addUser`, data);
};
