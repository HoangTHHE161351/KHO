import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getSubjectListService = (params) =>
  instanceAPIMain.get(ApiConstants.GET_SUBJECT_LIST, { params });

export const exportSubjectService = (params) =>
  instanceAPIMain.get(ApiConstants.EXPORT_SUBJECT, { params });

export const createSubjectService = (body) =>
  instanceAPIMain.post(ApiConstants.CREATE_SUBJECT, body);

export const editSubjectService = (body) =>
  instanceAPIMain.put(ApiConstants.EDIT_SUBJECT, body);

export const deleteSubjectService = (params) =>
  instanceAPIMain.delete(ApiConstants.DELETE_SUBJECT, { params });

export const getSubjectPickerData = () =>
  instanceAPIMain.get(ApiConstants.GET_SUBJECT_PICKER);

export const importSubject = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_SUBJECT, body);

export const importSubjectClass = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_SUBJECT_CLASS, body);
