import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getClassSubject = (params) =>
    instanceAPIMain.get(ApiConstants.GET_CLASSES_SUBJECT, { params });

export const createClassSubject = (body) =>
    instanceAPIMain.post(ApiConstants.ADD_CLASS_SUBJECT, body);

export const deleteClassSubject = (params) =>
    instanceAPIMain.delete(ApiConstants.DELETE_CLASS_SUBJECT, { params });