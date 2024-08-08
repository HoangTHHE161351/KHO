import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";
//Khởi tạo hàm để gửi yêu cầu
export const getTeacherList = (params) =>
  instanceAPIMain.get(ApiConstants.GET_TEACHER_LIST, { params });

export const getTeacherSubject = (teacherId, body) =>
  instanceAPIMain.post(ApiConstants.GET_TEACHER_SUBJECT_LIST, {
    params: { id: teacherId },
    body,
  });

export const getTeacherSubjectList = (params) =>
  instanceAPIMain.get(ApiConstants.GET_TEACHER_SUBJECT_LIST, { params });

export const getTeacherClassroomList = (params) =>
  instanceAPIMain.get(ApiConstants.GET_TEACHER_CLASSROOM_LIST, { params });

export const changeStatusTeacherService = (body) =>
  instanceAPIMain.put(ApiConstants.USER_MANAGER_CHANGE_STATUS, body);

export const editTeacherService = (body) =>
  instanceAPIMain.put(ApiConstants.EDIT_USER, body);

export const setNewPasswordService = (params) =>
  instanceAPIMain.put(`${ApiConstants.SET_NEW_PASSWORD}?${params}`);

export const deleteTeacherSubject = (params) =>
  instanceAPIMain.delete(ApiConstants.DELETE_TEACHER_SUBJECT, { params });

export const addTeacherSubjectService = (body) =>
  instanceAPIMain.post(ApiConstants.ADD_TEACHER_SUBJECT, body);

export const importTeacherSubjectService = (body) =>
  instanceAPIMain.post(ApiConstants.IMPORT_TEACHER_SUBJECT, body);
