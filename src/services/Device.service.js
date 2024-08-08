import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getDeviceListService = (params) =>
  instanceAPIMain.get(ApiConstants.GET_DEVICE_LIST, { params });

export const createDeviceService = (data) =>
  instanceAPIMain.post(ApiConstants.CREATE_CAMERA, data);

export const getHardDiskService = () =>
  instanceAPIMain.get(ApiConstants.GET_HARD_DISK);

export const loginHardDiskService = (data) =>
  instanceAPIMain.post(ApiConstants.LOGIN_HARD_DISK, data);

export const logoutHardDiskService = () =>
  instanceAPIMain.get(ApiConstants.LOGOUT_HARD_DISK);

export const editDeviceService = (data) =>
  instanceAPIMain.put(ApiConstants.EDIT_CAMERA, data);

export const deleteDeviceService = (params) =>
  instanceAPIMain.delete(ApiConstants.DELETE_CAMERA, { params });

export const getCameraAccess = (params) =>
  instanceAPIMain.get(ApiConstants.GET_CAMERA_ACCESS + "?cameraId=" + params?.cameraId);

export const getCameraAccessByRoom = (params) =>
  instanceAPIMain.get(ApiConstants.GET_CAMERA_ACCESS_BY_ROOM + "?roomId=" + params?.roomId);

