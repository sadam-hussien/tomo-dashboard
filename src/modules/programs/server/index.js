import Api from "server/axios";

export const apiGetPrograms = ({ pageParam }) => {
  return Api().get("programs", {
    params: pageParam,
  });
};

export function apiAddProgram(data) {
  return Api().post(`programs`, data);
}

export function apiAddProgramMeals(data) {
  return Api().post(`main-meals`, data);
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
