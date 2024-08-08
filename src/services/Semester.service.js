import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getSemester = (params) =>
  instanceAPIMain.get(ApiConstants.GET_SEMESTER_LIST, { params });

export const createSemester = (data) =>
  instanceAPIMain.post(ApiConstants.CREATE_SEMESTER, data);

export const editSemester = (data) =>
  instanceAPIMain.put(ApiConstants.EDIT_SEMESTER, data);

export const deleteSemester = (id) =>
  instanceAPIMain.delete(ApiConstants.DELETE_SEMESTER, { params: { id } });

export const getSemesterPickerData = () =>
  instanceAPIMain.get(ApiConstants.GET_SEMESTER_PICKER);

export const importSemester = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_SEMESTER, body);
