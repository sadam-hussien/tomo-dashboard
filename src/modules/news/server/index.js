import Api from "server/axios";

export const apiGetSubscriptions = ({ pageParam }) => {
  return Api().get("member", {
    params: pageParam,
  });
};

export function apiAddSubscription(data) {
  return Api().post(`member`, data);
}

export function apiEditSubscription(data) {
  return Api().put(`member`, data);
}

// export function apiAddProgramMeals(data) {
//   return Api().post(`main-meals`, data);
// }

// export function apiUploadImg(file) {
//   return Api().post(`upload/image`, file);
// }
