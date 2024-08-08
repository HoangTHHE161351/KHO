import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getRoomList = (params) =>
  instanceAPIMain.get(ApiConstants.ROOM_LIST, { params });

export const createRoom = (data) =>
  instanceAPIMain.post(ApiConstants.CREATE_ROOM, data);

export const editRoom = (data) =>
  instanceAPIMain.put(ApiConstants.EDIT_ROOM, data);

export const deleteRoom = (id) =>
  instanceAPIMain.delete(ApiConstants.DELETE_ROOM, { params: { id } });

export const getRoomPickerData = () =>
  instanceAPIMain.get(ApiConstants.GET_ROOM_PICKER);

export const getClassRoomPickerData = () =>
  instanceAPIMain.get(ApiConstants.GET_CLASS_ROOM_PICKER);

export const getRoomLogs = ({ params }) =>
  instanceAPIMain.get(
    ApiConstants.GET_HISTORY_ROOM_LOG +
      "?search=" +
      params?.search +
      "&roomId=" +
      params.roomId +
      "&date=" +
      params.date +
      "&page=" +
      params?.page +
      "&size=" +
      params?.size
  );

export const getDetailLoggedUser = ({ params }) =>
  instanceAPIMain.get(
    ApiConstants.GET_DETAIL_LOGGED_USER +
      "?roomId=" +
      params?.roomId +
      "&userName=" +
      params?.userName +
      "&date=" +
      params?.date
  );

export const importRoom = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_ROOM, body);
