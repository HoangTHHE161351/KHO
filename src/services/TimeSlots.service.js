import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getTimeSlotsList = (params) =>
  instanceAPIMain.get(ApiConstants.TIME_SLOTS, { params });

export const createTimeSlot = (data) =>
  instanceAPIMain.post(ApiConstants.CREATE_TIME_SLOT, data);

export const editTimeSlot = (data) =>
  instanceAPIMain.put(ApiConstants.EDIT_TIME_SLOT, data);

export const deleteTimeSlot = (id) =>
  instanceAPIMain.delete(ApiConstants.DELETE_TIME_SLOT, { params: { id } });

export const getScheduleWeeks = (params) =>
  instanceAPIMain.get(ApiConstants.GET_WEEKS, { params });

export const importTimeSlot = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_TIME_SLOT, body);
