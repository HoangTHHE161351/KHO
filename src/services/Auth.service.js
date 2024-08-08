import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const requestLoginService = ({ username, password }) =>
  instanceAPIMain.post(ApiConstants.LOGIN, { username, password });

export const requestRegisterService = (body) =>
  instanceAPIMain.post(ApiConstants.REGISTER, body);

export const getUserProfile = () => instanceAPIMain.get(ApiConstants.PROFILE);

export const requestVerifyCodeService = (params) =>
  instanceAPIMain.get(ApiConstants.VERIFY_CODE, { params });

export const requestResetPasswordService = (body) =>
  instanceAPIMain.put(ApiConstants.RESET_PASSWORD, body);
