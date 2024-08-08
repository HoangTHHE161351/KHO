import { instanceAPIMain } from "src/api";
import apiRequest from "src/api/http";
import { ApiConstants } from "src/const";

export const getAttendClass = ({ scheduleId }) =>
  apiRequest.get(ApiConstants.GET_ATTENDANCE_CLASS, { params: { scheduleId } });

export const getAttendReport = (params) =>
  apiRequest.get(
    ApiConstants.GET_ATTENDANCE_REPORT +
      "?semesterId=" +
      params?.semesterId +
      "&classId=" +
      params?.classId
  );

export const checkAttendance = (scheduleId, body) =>
  apiRequest.put(ApiConstants.CHECK_ATTENDANCE, {
    params: { scheduleId },
    body,
  });

export const getAttendanceListLogs = (params) =>
  apiRequest.get(
    ApiConstants.GET_ATTENDANCE_LIST_LOG +
      "?classId=" +
      params?.classId +
      "&slotId=" +
      params?.slotId +
      "&search=" +
      params?.search +
      "&subjectId=" +
      params?.subjectId +
      "&date=" +
      params?.date +
      "&page=" +
      params?.page +
      "&size=" +
      params?.size
  );

export const updateAttendance = (params) =>
  instanceAPIMain.put(ApiConstants.UPDATE_ATTENDANCE, params);
