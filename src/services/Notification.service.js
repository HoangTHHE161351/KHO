import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getListNotification = () =>
  instanceAPIMain.get(ApiConstants.GET_LIST_NOTIFICATION);

export const markedReadNotification = (id) =>
  instanceAPIMain.post(`${ApiConstants.READ_NOTIFICATION}${id}`);
