import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const verifyCodeChangePasswordService = () =>
  instanceAPIMain.get(ApiConstants.VERIFY_CODE_CHANGE_PASSWORD);

export const changePasswordService = (body) =>
  instanceAPIMain.put(ApiConstants.CHANGE_PASSWORD, body);

export const createUserService = (body) =>
  instanceAPIMain.post(ApiConstants.CREATE_USER, body);

export const getUserByTokenService = (token) =>
  instanceAPIMain.get(ApiConstants.GET_USER_BY_TOKEN, { params: { token } });

export const activeUserService = (body) =>
  instanceAPIMain.put(ApiConstants.ACTIVE_USER, body);

export const changeStatusUserService = (body) =>
  instanceAPIMain.put(ApiConstants.USER_MANAGER_CHANGE_STATUS, body);

export const getUserListService = (params) =>
  instanceAPIMain.get(ApiConstants.GET_USER_LIST, { params });

export const getUserBlackListService = (params) =>
  instanceAPIMain.get(ApiConstants.GET_BLACK_LIST, { params });

export const exportUserService = (params) =>
  instanceAPIMain.get(ApiConstants.EXPORT_USER_LIST, { params });

export const editUserService = (body) =>
  instanceAPIMain.put(ApiConstants.EDIT_USER, body);

export const editProfileService = (body) =>
  instanceAPIMain.post(ApiConstants.CHANGE_PROFILE, body);

export const importUserService = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_USER, body);

export const setNewPasswordService = (params) =>
  instanceAPIMain.put(`${ApiConstants.SET_NEW_PASSWORD}?${params}`);
