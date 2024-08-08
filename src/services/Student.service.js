import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getStudentListService = (params) =>
  instanceAPIMain.get(ApiConstants.GET_STUDENT_LIST, { params });

export const exportStudentService = (params) =>
  instanceAPIMain.get(ApiConstants.EXPORT_STUDENT, { params });

export const importStudentClassService = (data) =>
  instanceAPIMain.post(ApiConstants.IMPORT_STUDENT_CLASS, data);

export const importStudentCurriculumService = (data) =>
  instanceAPIMain.post(ApiConstants.IMPORT_STUDENT_CURRICULUM, data);
