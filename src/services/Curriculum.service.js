import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getCurriculumList = (params) =>
  instanceAPIMain.get(ApiConstants.GET_CURRICULUM_LIST, { params });

export const createCurriculum = (data) =>
  instanceAPIMain.post(ApiConstants.CREATE_CURRICULUM, data);

export const editCurriculum = (data) =>
  instanceAPIMain.put(ApiConstants.EDIT_CURRICULUM, data);

export const deleteCurriculum = (id) =>
  instanceAPIMain.delete(ApiConstants.DELETE_CURRICULUM, { params: { id } });

export const getCurriculumDetail = (id) =>
  instanceAPIMain.get(ApiConstants.CURRICULUM_DETAIL, { params: { id } });

export const importCurriculum = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_CURRICULUM, body);

export const importSubjectCurriculum = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_SUBJECT_CURRICULUM, body);
export const getCurriculumStudent = (params) =>
  instanceAPIMain.get(ApiConstants.GET_CURRICULUM_STUDENT, { params });

export const addStudentCurriculum = (data) =>
  instanceAPIMain.post(ApiConstants.ADD_STUDENT_CURRICULUM, data);

export const getDropdownCurriculum = () =>
  instanceAPIMain.get(ApiConstants.GET_CURRICULUM_DROPDOWN);

export const getCurriculumSubjects = (params) =>
  instanceAPIMain.get(ApiConstants.GET_SUBJECT_CURRICULUM, { params });

export const addSubjectCurriculum = (body) =>
  instanceAPIMain.post(ApiConstants.ADD_SUBJECT_CURRICULUM, body);

export const deleteSubjectCurriculum = (params) =>
  instanceAPIMain.delete(ApiConstants.DELETE_SUBJECT_CURRICULUM, { params });
