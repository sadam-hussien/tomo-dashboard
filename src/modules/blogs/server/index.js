import Api from "server/axios";

export const apiGetBlogs = (params) => {
  return Api().get("blogs", {
    params,
  });
};

export function apiAddBlog(data) {
  return Api().post(`blogs`, data);
}

export function apiEditBlog(data) {
  return Api().put(`blogs`, data);
}

export function apiDeleteBlog(id) {
  return Api().delete(`blogs?id=${id}`);
}

// export function apiAddProgramMeals(data) {
//   return Api().post(`main-meals`, data);
// }

// export function apiUploadImg(file) {
//   return Api().post(`upload/image`, file);
// }
