import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getTeacherList = (subjectId) => instanceAPIMain.get(ApiConstants.DROPDOWN_TEACHER, { params: { subjectId } });

export const getSubjectList = () => instanceAPIMain.get(ApiConstants.DROPDOWN_SUBJECT);

export const getClassroomList = (subjectId) => instanceAPIMain.get(ApiConstants.DROPDOWN_CLASSROOM, { params: { subjectId } });