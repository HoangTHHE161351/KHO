import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const viewFacialService = (userId) =>
  instanceAPIMain.get(ApiConstants.VIEW_FACIAL, { params: { userId } });

export const addFacialService = (userId, body) =>
  instanceAPIMain.post(`${ApiConstants.ADD_FACIAL}?userId=${userId}`, body);

export const deleteFacialService = (userId, body) =>
  instanceAPIMain.delete(ApiConstants.DELETE_FACIAL, {
    params: { userId },
    data: body,
  });

export const getImageLogs = (time) =>
  instanceAPIMain.get(ApiConstants.GET_IMAGE_LOGS, { params: { time } });
