// Common
export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
//Định nghĩa đường dẫn API endpoint
export const HEADER_UPLOAD = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

export const TIMEOUT = 60000;

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const USER_INFO = "user_info";

export const STT_OK = 200;

export const LOGIN = "/api/v1/login";
export const REGISTER = "/api/v1/login/register";
export const PROFILE = "/api/v1/login/get-profile";

export const VERIFY_CODE = "/api/v1/user/send-otp-reset-password";
export const RESET_PASSWORD = "/api/v1/user/reset-password";

export const VERIFY_CODE_CHANGE_PASSWORD =
  "/api/v1/user/send-otp-change-password";
export const CHANGE_PASSWORD = "/api/v1/user/change-password";

export const CREATE_USER = "/api/v1/user/add-user";
export const GET_USER_BY_TOKEN = "/api/v1/user/get-user-by-token"; //get
export const ACTIVE_USER = "/api/v1/user/active-user"; // post

export const GET_USER_LIST = "/api/v1/user/all-users";
export const GET_BLACK_LIST = "/api/v1/user/user-blacklist";
export const EXPORT_USER_LIST = "/api/v1/user/export-user";
export const USER_MANAGER_CHANGE_STATUS = "/api/v1/user/change-status";
export const EDIT_USER = "/api/v1/user/edit-user";
export const IMPORT_USER = "/api/v1/user/import-user";
export const SET_NEW_PASSWORD = "/api/v1/user/set-newPass";

export const GET_STUDENT_LIST = "/api/v1/student/search-student";
export const EXPORT_STUDENT = "/api/v1/student/export-student";
export const IMPORT_STUDENT_CLASS =
  "/api/v1/student-class/import-student-class";
export const IMPORT_STUDENT_CURRICULUM =
  "/api/v1/curriculum/import-student-curriculum";

export const GET_DEVICE_LIST = "/api/v1/camera/camera";
export const CREATE_CAMERA = "/api/v1/camera/add-camera";
export const EDIT_CAMERA = "/api/v1/camera/edit-camera";
export const DELETE_CAMERA = "/api/v1/camera/delete-camera";
export const GET_CAMERA_ACCESS = "/api/v1/camera/get-camera-access";
export const GET_CAMERA_ACCESS_BY_ROOM =
  "/api/v1/camera/get-camera-access-by-room";

export const GET_HARD_DISK = "/api/v1/device/get-disk-status";
export const LOGIN_HARD_DISK = "/api/v1/device/server-login";
export const LOGOUT_HARD_DISK = "/api/v1/device/server-logout";

export const GET_SUBJECT_LIST = "/api/v1/subject/all-subjects";
export const CREATE_SUBJECT = "/api/v1/subject/add-subject";
export const EDIT_SUBJECT = "/api/v1/subject/edit-subject";
export const EXPORT_SUBJECT = "/api/v1/student/";
export const DELETE_SUBJECT = "/api/v1/subject/delete-subject";
export const IMPORT_SUBJECT = "/api/v1/subject/import-subject";
export const IMPORT_SUBJECT_CLASS = "api/v1/class-subject/import-class-subject";

export const VIEW_SCHEDULE = "/api/v1/schedule/view-schedule";
export const VIEW_SCHEDULE_DETAIL = "/api/v1/schedule/schedule-details";
export const DELETE_SCHEDULE = "/api/v1/schedule/delete-schedule";
export const ADD_SCHEDULE = "/api/v1/schedule/add-schedule";
export const EDIT_SCHEDULE = "/api/v1/schedule/edit-schedule";
export const IMPORT_SCHEDULE = "/api/v1/schedule/import_schedule";
export const STUDENT_SCHEDULE = "/api/v1/schedule/student-schedule";
export const EXPORT_SCHEDULE = "/api/v1/schedule/export-schedule";

export const GET_SEMESTER_LIST = "/api/v1/semester/all-semester";
export const CREATE_SEMESTER = "/api/v1/semester/add-semester";
export const EDIT_SEMESTER = "/api/v1/semester/edit-semester";
export const DELETE_SEMESTER = "/api/v1/semester/delete-semester";
export const IMPORT_SEMESTER = "/api/v1/semester/import-semester";

export const GET_CURRICULUM_LIST = "/api/v1/curriculum/all-curriculum";
export const CREATE_CURRICULUM = "/api/v1/curriculum/add-curriculum";
export const EDIT_CURRICULUM = "/api/v1/curriculum/edit-curriculum";
export const DELETE_CURRICULUM = "/api/v1/curriculum/delete-curriculum";
export const CURRICULUM_DETAIL = "/api/v1/curriculum/curriculum-details";
export const IMPORT_CURRICULUM = "/api/v1/curriculum/import-curriculum";
export const IMPORT_SUBJECT_CURRICULUM =
  "/api/v1/curriculum/import-subject-curriculum";

export const ROOM_LIST = "/api/v1/room/all-rooms";
export const CREATE_ROOM = "/api/v1/room/add-room";
export const EDIT_ROOM = "/api/v1/room/edit-room";
export const DELETE_ROOM = "/api/v1/room/delete-room";
export const IMPORT_ROOM = "/api/v1/room/import-room";

export const TIME_SLOTS = "/api/v1/timeslots/all-timeslot";
export const CREATE_TIME_SLOT = "/api/v1/timeslots/add-timeslot";
export const EDIT_TIME_SLOT = "/api/v1/timeslots/edit-timeslot";
export const DELETE_TIME_SLOT = "/api/v1/timeslots/delete-timeslot";
export const IMPORT_TIME_SLOT = "/api/v1/timeslots/import-timeslot";

export const CLASSES_LIST = "/api/v1/classroom/all-classroom";
export const CREATE_CLASS = "/api/v1/classroom/add-classroom";
export const EDIT_CLASS = "/api/v1/classroom/edit-classroom";
export const DELETE_CLASS = "/api/v1/classroom/delete-classroom";
export const GET_CLASS_SUBJECT = "api/v1/class-subject/all-class-subject";
export const IMPORT_CLASS = "/api/v1/classroom/import-classroom";

//Teacher
export const GET_TEACHER_LIST = "/api/v1/teacher/users-teacher";
export const GET_TEACHER_SUBJECT_LIST = "/api/v1/teacher/teacher-subject";
export const GET_TEACHER_CLASSROOM_LIST = "/api/v1/teacher/teacher-classroom";
export const DELETE_TEACHER_SUBJECT = "/api/v1/teacher/delete-teacher-subject";
export const ADD_TEACHER_SUBJECT = "/api/v1/teacher/add-teacher-subject";
export const IMPORT_TEACHER_SUBJECT = "/api/v1/teacher/import-teacher-subject";

//Attendance
export const GET_ATTENDANCE_REPORT = "/api/v1/attendance/attendance-report";
export const GET_ATTENDANCE_CLASS = "/api/v1/attendance/attendance-class";
export const CHECK_ATTENDANCE = "/api/v1/attendance/check-attendance";
export const GET_WEEKS = "/api/v1/timeslots/weeks";
export const GET_ATTENDANCE_LIST_LOG = "/api/v1/attendance/list-student-class";
export const UPDATE_ATTENDANCE = "/api/v1/attendance/update-attendance";

// Room
export const GET_ROOM_PICKER = "/api/v1/room/dropdown-rooms";
export const GET_CLASS_ROOM_PICKER = "/api/v1/classroom/dropdown-class";
export const GET_HISTORY_ROOM_LOG = "/api/v1/room/history-room-log";
export const GET_DETAIL_LOGGED_USER = "/api/v1/room/history-log";

//Log
export const GET_STRANGE_LOGS = "/api/v1/log/get-logs";

//Semester
export const GET_SEMESTER_PICKER = "/api/v1/semester/dropdown-semester";

//Subject
export const GET_SUBJECT_PICKER = "/api/v1/subject/dropdown-subject";

//dropdown schedule
export const DROPDOWN_CLASSROOM = "/api/v1/classroom/dropdown-classroom";
export const DROPDOWN_SUBJECT = "/api/v1/subject/dropdown-subject";
export const DROPDOWN_TEACHER = "/api/v1/teacher/dropdown-teacher";
//facial
export const VIEW_FACIAL = "/api/v1/face/view-faceId";
export const ADD_FACIAL = "/api/v1/face/add-faceId";
export const DELETE_FACIAL = "/api/v1/face/delete-faceId";
export const GET_IMAGE_LOGS = "/api/v1/face/get-image-logs";

//module API
export const CALL_MODELING_API = "/api/v1/module/call-modeling-api";

//load schedule request
export const SEND_LOAD_REQUEST_SCHEDULE_REQUEST =
  "/api/v1/mqtt/sendLoadScheduleRequest";

export const GET_SCHEDULE_LOG = "/api/v1/log/get-stranger-by-schedule";

export const CHANGE_PROFILE = "/api/v1/login/edit-profile";

// noti
export const GET_LIST_NOTIFICATION = "/api/v1/notify/get-notifies";
export const READ_NOTIFICATION = "/api/v1/notify/set-read-notify?notifyId=";

//Schedule

//Student Class
export const GET_STUDENT_CLASS = "/api/v1/student-class/get-all-students-class";
export const DELETE_STUDENT_CLASS =
  "/api/v1/student-class/delete-student-class";
export const ADD_STUDENT_CLASS = "/api/v1/student-class/add-student-class";

//Curriculum
export const GET_CURRICULUM_STUDENT =
  "/api/v1/curriculum/get-all-curriculums-student";
export const ADD_STUDENT_CURRICULUM =
  "/api/v1/curriculum/add-student-curriculum";
export const GET_CURRICULUM_DROPDOWN = "/api/v1/curriculum/dropdown-curriculum";

export const GET_SUBJECT_CURRICULUM =
  "/api/v1/curriculum/get-all-subjects-curiculum";
export const ADD_SUBJECT_CURRICULUM =
  "/api/v1/curriculum/add-subject-curriculum";
export const DELETE_SUBJECT_CURRICULUM =
  "/api/v1/curriculum/delete-curriculum-sub";

//Class Subject
export const GET_CLASSES_SUBJECT = "/api/v1/class-subject/get-classes-subject";
export const ADD_CLASS_SUBJECT = "/api/v1/class-subject/add-class-subject";
export const DELETE_CLASS_SUBJECT =
  "/api/v1/class-subject/delete-class-subject";
