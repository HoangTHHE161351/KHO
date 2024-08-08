import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getStudentClassService = (params) =>
  instanceAPIMain.get(ApiConstants.GET_STUDENT_CLASS, { params });

export const deleteStudentClassService = (params) =>
  instanceAPIMain.delete(ApiConstants.DELETE_STUDENT_CLASS, { params });

export const createStudentClassService = (body) =>
  instanceAPIMain.post(ApiConstants.ADD_STUDENT_CLASS, body);
