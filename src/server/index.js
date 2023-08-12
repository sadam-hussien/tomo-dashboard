import Api from "server/axios";

export const apiLogout = () => {
  return Api().post("coaches/logout");
};

export const apiUploadImage = (data) => {
  return Api().post("upload/image", data);
};
