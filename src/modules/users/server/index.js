import Api from "server/axios";

export const apiGetUsers = (config) => {
  return Api().get("leaders", {
    params: config,
  });
};

export const apiGetUserById = (id) => {
  return Api().get(`user/?id=${id}`);
};

export const apiGetAllPrograms = (id) => {
  return Api().get(`programs`);
};

export const apiAddUserToProgram = (data) => {
  return Api().post(`programs/addUserToProgram`, data);
};
