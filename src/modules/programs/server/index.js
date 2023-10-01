import Api from "server/axios";

export const apiGetPrograms = (params) => {
  return Api().get("programs", {
    params: params,
  });
};

export const apiGetClients = (params) => {
  return Api().get("leaders", {
    params: params,
  });
};

export function apiAddProgram(data) {
  return Api().post(`programs`, data);
}

export function apiAddProgramMeals(data) {
  return Api().post(`main-meals`, data);
}

export function apiAddProgramExcercise(data) {
  return Api().post(`excersice`, data);
}

export function apiEditProgramExcercise(data) {
  return Api().put(`excersice`, data);
}

export function apiEditProgram(data) {
  return Api().put(`programs`, data);
}

export function apiEditProgramMeals(data) {
  return Api().put(`main-meals`, data);
}

export function apiUploadImg(file) {
  return Api().post(`upload/image`, file);
}

export function apiAssignProgramToUser(data) {
  return Api().post("programs/addUserToProgram", data);
}

export function apiDeleteProgram(id) {
  return Api().delete(`programs/${id}`);
}
