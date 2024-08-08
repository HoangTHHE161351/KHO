import { Fragment, lazy } from "react";
import { PathConstants } from "../const";

const HomePage = lazy(() => import("./Home"));
const LoginPage = lazy(() => import("./Login"));
const RegisterPage = lazy(() => import("./Register"));
const UserManagerPage = lazy(() => import("./UserManager"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const ResetPassword = lazy(() => import("./ResetPassword"));
const StudentManager = lazy(() => import("./StudentManager"));
const Schedule = lazy(() => import("./Schedule"));
const DeviceManager = lazy(() => import("./DeviceManager"));
const ProfilePage = lazy(() => import("./Profile"));
const ActivePage = lazy(() => import("./ActiveUser"));
const BlackListPage = lazy(() => import("./UserManager/BlackListManager"));
const SubjectPage = lazy(() => import("./ConfigSystem/Subject"));
const SemesterPage = lazy(() => import("./ConfigSystem/Semester"));
const CurriculumPage = lazy(() => import("./ConfigSystem/Curriculum"));
const ClassPage = lazy(() => import("./ConfigSystem/Classes"));
const RoomPage = lazy(() => import("./ConfigSystem/Room"));
const TimeSlotsPage = lazy(() => import("./ConfigSystem/TimeSlots"));
const TeacherPage = lazy(() => import("./TeacherManager"));
const TeacherProfile = lazy(() => import("./TeacherManager/Profile.jsx"));
const HistoryLog = lazy(() => import("./ConfigSystem/HistoryLog"));
const AttendanceReport = lazy(() => import("./AttendanceReport/index"));
const AttendanceManager = lazy(() => import("./AttendanceManager/index"));

const ScheduleStudent = lazy(() => import("./Schedule/ScheduleStudent"));
const StrangeMonitor = lazy(() => import("./StrangeMonitor/index.jsx"));

const publicRoutes = [
  {
    path: PathConstants.LOGIN,
    element: LoginPage,
  },
  {
    path: PathConstants.REGISTER,
    element: RegisterPage,
  },
  {
    path: PathConstants.FORGOT_PASSWORD,
    element: ForgotPassword,
  },
  {
    path: PathConstants.ACTIVE_USER,
    element: ActivePage,
  },
];

const popularRoutes = [
  // {
  //   path: PathConstants.ROOT,
  //   element: HomePage,
  // },
  { path: PathConstants.PROFILE, element: ProfilePage },
  { path: PathConstants.ATTENDANCE_REPORT, element: AttendanceReport },
];

const studentRoutes = [
  {
    path: PathConstants.SCHEDULE_STUDENT,
    element: ScheduleStudent,
  },
];

const teacherRoutes = [{ path: PathConstants.SCHEDULE, element: Schedule }];

const staffRoutes = [
  { path: PathConstants.SCHEDULE, element: Schedule },
  { path: PathConstants.BLACK_LIST, element: BlackListPage },
  {
    path: PathConstants.USER_MANAGER,
    element: UserManagerPage,
  },
  {
    path: PathConstants.TEACHER_MANAGER,
    element: TeacherPage,
    //Nối đường dẫn đến trang tương ứng
  },
  {
    path: PathConstants.PROFILE,
    element: ProfilePage,
  },
  {
    path: PathConstants.STUDENT_MANAGER,
    element: StudentManager,
  },
  {
    path: PathConstants.SUBJECT_MANAGER,
    element: SubjectPage,
  },
  {
    path: PathConstants.SEMESTER,
    element: SemesterPage,
  },
  {
    path: PathConstants.CURRICULUM,
    element: CurriculumPage,
  },
  {
    path: PathConstants.CLASSES,
    element: ClassPage,
  },
  {
    path: PathConstants.ROOMS,
    element: RoomPage,
  },
  {
    path: PathConstants.TIME_SLOTS,
    element: TimeSlotsPage,
  },
  { path: PathConstants.ATTENDANCE_REPORT, element: AttendanceReport },
  { path: PathConstants.ATTENDANCE_MANAGER, element: AttendanceManager },
  {
    path: PathConstants.HISTORY_LOG,
    element: HistoryLog,
    //Nối đường dẫn đến trang tương ứng
  },
  {
    path: PathConstants.STRANGER_MONITOR,
    element: StrangeMonitor,
    //Nối đường dẫn đến trang tương ứng
  },
];

const adminRoutes = [
  { path: PathConstants.ROOT, element: HomePage },
  {
    path: PathConstants.RESET_PASSWORD,
    element: ResetPassword,
    layout: Fragment,
  },
  {
    path: PathConstants.STUDENT_MANAGER,
    element: StudentManager,
  },
  { path: PathConstants.DEVICE_MANAGER, element: DeviceManager },
  { path: PathConstants.BLACK_LIST, element: BlackListPage },
  {
    path: PathConstants.SUBJECT_MANAGER,
    element: SubjectPage,
  },
  {
    path: PathConstants.SEMESTER,
    element: SemesterPage,
  },
  {
    path: PathConstants.CURRICULUM,
    element: CurriculumPage,
  },
  {
    path: PathConstants.CLASSES,
    element: ClassPage,
  },
  {
    path: PathConstants.ROOMS,
    element: RoomPage,
  },
  {
    path: PathConstants.TIME_SLOTS,
    element: TimeSlotsPage,
  },
  {
    path: PathConstants.TEACHER_MANAGER,
    element: TeacherPage,
    //Nối đường dẫn đến trang tương ứng
  },
  {
    path: PathConstants.TEACHER_PROFILE,
    element: TeacherProfile,
    //Nối đường dẫn đến trang tương ứng
  },

  {
    path: PathConstants.HISTORY_LOG,
    element: HistoryLog,
    //Nối đường dẫn đến trang tương ứng
  },

  { path: PathConstants.SCHEDULE, element: Schedule },

  { path: PathConstants.ATTENDANCE_REPORT, element: AttendanceReport },
  { path: PathConstants.ATTENDANCE_MANAGER, element: AttendanceManager },

  {
    path: PathConstants.STRANGER_MONITOR,
    element: StrangeMonitor,
    //Nối đường dẫn đến trang tương ứng
  },
];

export {
  publicRoutes,
  popularRoutes,
  adminRoutes,
  studentRoutes,
  teacherRoutes,
  staffRoutes,
};
