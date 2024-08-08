import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowIcon,
  CameraIcon,
  HomeIcon,
  ScheduleIcon,
  UserManagerIcon,
} from "src/assets/icons";
import HistoryLog from "src/assets/icons/HistoryLog";
import AttendanceReport from "src/assets/icons/AttendanceReport";
import AttendanceManage from "src/assets/icons/AttendanceManage";
import StrangeMonitor from "src/assets/icons/StrangeMonitor";
import ConfigSystem from "src/assets/icons/ConfigSystem";
import StudentIcon from "src/assets/icons/StudentIcon";
import { DataConstants, PathConstants } from "src/const";
import TeacherManageIcon from "src/assets/icons/TeacherManageIcon";

const SideBarMenu = ({ open }) => {
  const navigate = useNavigate();
  const [openDrop, setOpenDrop] = React.useState(null);

  const userInfo = useSelector((state) => state.authReducer.userInfo);

  const MenuList = useMemo(() => {
    switch (userInfo.roleId) {
      case DataConstants.ROLE.ADMIN:
        return LIST_MENU_ADMIN;
      case DataConstants.ROLE.TEACHER:
        return LIST_TEACHER_MENU;
      case DataConstants.ROLE.STUDENT:
        return LIST_MENU_STUDENT;
      case DataConstants.ROLE.STAFF:
        return LIST_STAFF_MENU;

      default:
        return [];
    }
  }, [userInfo]);

  return (
    <List>
      {MenuList?.map((item) => (
        <ListItem disablePadding sx={{ display: "block" }} key={item.id}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => {
              if (item.children && open) {
                setOpenDrop((prev) => (prev === item.id ? null : item.id));
              } else {
                navigate(item.path);
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ fontSize: "18px" }}
              sx={{ opacity: open ? 1 : 0 }}
            />
            {item.children &&
              open &&
              (openDrop === item.id ? (
                <ArrowIcon
                  sx={{
                    fontSize: "16px",
                    transform: "rotate(90deg)",
                  }}
                />
              ) : (
                <ArrowIcon
                  sx={{
                    transform: "rotate(-90deg)",
                    fontSize: "16px",
                  }}
                />
              ))}
          </ListItemButton>
          {item.children && (
            <Collapse
              in={openDrop === item.id && open}
              timeout="auto"
              unmountOnExit
            >
              {item.children.map((child) => (
                <List component="div" disablePadding key={child.path}>
                  <ListItemButton
                    sx={{
                      pl: open ? 4 : "20px",
                      transition: "ease-in-out 0.2s",
                    }}
                    onClick={() => navigate(child.path)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={child.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default memo(SideBarMenu);

const LIST_TEACHER_MENU = [
  {
    id: "schedule",
    icon: ScheduleIcon,
    text: "Schedule",
    path: PathConstants.SCHEDULE,
  },
  {
    id: "attendanceReport",
    icon: HomeIcon,
    text: "Attendance Report",
    path: PathConstants.ATTENDANCE_REPORT,
  },
];

// eslint-disable-next-line no-sparse-arrays
const LIST_STAFF_MENU = [
  {
    id: "user",
    icon: UserManagerIcon,
    text: "User Manager",
    path: PathConstants.USER_MANAGER,
    children: [
      {
        icon: UserManagerIcon,
        text: "User Manager List",
        path: PathConstants.USER_MANAGER,
      },
      {
        icon: UserManagerIcon,
        text: "User Black List",
        path: PathConstants.BLACK_LIST,
      },
    ],
  },
  {
    id: "teacher",
    icon: TeacherManageIcon,
    text: "Teacher Manager",
    path: PathConstants.TEACHER_MANAGER,
  },
  {
    id: "student",
    icon: StudentIcon,
    text: "Student Manager",
    path: PathConstants.STUDENT_MANAGER,
  },
  {
    id: "schedule",
    icon: ScheduleIcon,
    text: "Schedule",
    path: PathConstants.SCHEDULE,
  },
  {
    id: "config",
    icon: ConfigSystem,
    text: "Config System",
    children: [
      {
        icon: UserManagerIcon,
        text: "Subject",
        path: PathConstants.SUBJECT_MANAGER,
      },
      {
        icon: UserManagerIcon,
        text: "Semester",
        path: PathConstants.SEMESTER,
      },
      {
        icon: UserManagerIcon,
        text: "Curriculum",
        path: PathConstants.CURRICULUM,
      },
      {
        icon: UserManagerIcon,
        text: "Classes",
        path: PathConstants.CLASSES,
      },
      {
        icon: UserManagerIcon,
        text: "Rooms",
        path: PathConstants.ROOMS,
      },
      {
        icon: UserManagerIcon,
        text: "Time Slots",
        path: PathConstants.TIME_SLOTS,
      },
    ],
  },
  {
    id: "log",
    icon: StrangeMonitor,
    text: "Log Manager",
    path: PathConstants.HISTORY_LOG,
    children: [
      {
        // id: "historyLog",
        icon: HistoryLog,
        text: "History Log",
        path: PathConstants.HISTORY_LOG,
      },
      {
        //id: "strange",
        icon: StrangeMonitor,
        text: "Stranger Monitor",
        path: PathConstants.STRANGER_MONITOR,
      },
    ],
  },
  {
    id: "attendanceReport",
    icon: AttendanceReport,
    text: "Attendance Report",
    path: PathConstants.ATTENDANCE_REPORT,
  },
  {
    id: "attendanceManager",
    icon: AttendanceManage,
    text: "Attendance Manager",
    path: PathConstants.ATTENDANCE_MANAGER,
  },
];

// eslint-disable-next-line no-sparse-arrays
const LIST_MENU_ADMIN = [
  // {
  //   id: "home",
  //   icon: HomeIcon,
  //   text: "Dashboard",
  //   path: PathConstants.ROOT,
  // },
  {
    id: "user",
    icon: UserManagerIcon,
    text: "User Manager",
    path: PathConstants.USER_MANAGER,
    children: [
      {
        icon: UserManagerIcon,
        text: "User Manager List",
        path: PathConstants.USER_MANAGER,
      },
      {
        icon: UserManagerIcon,
        text: "User Black List",
        path: PathConstants.BLACK_LIST,
      },
    ],
  },
  {
    id: "teacher",
    icon: TeacherManageIcon,
    text: "Teacher Manager",
    path: PathConstants.TEACHER_MANAGER,
  },
  {
    id: "student",
    icon: StudentIcon,
    text: "Student Manager",
    path: PathConstants.STUDENT_MANAGER,
  },
  {
    id: "schedule",
    icon: ScheduleIcon,
    text: "Schedule",
    path: PathConstants.SCHEDULE,
  },
  {
    id: "camera",
    icon: CameraIcon,
    text: "Device Manager",
    path: PathConstants.DEVICE_MANAGER,
  },
  {
    id: "config",
    icon: ConfigSystem,
    text: "Config System",
    children: [
      {
        icon: UserManagerIcon,
        text: "Subject",
        path: PathConstants.SUBJECT_MANAGER,
      },
      {
        icon: UserManagerIcon,
        text: "Semester",
        path: PathConstants.SEMESTER,
      },
      {
        icon: UserManagerIcon,
        text: "Curriculum",
        path: PathConstants.CURRICULUM,
      },
      {
        icon: UserManagerIcon,
        text: "Classes",
        path: PathConstants.CLASSES,
      },
      {
        icon: UserManagerIcon,
        text: "Rooms",
        path: PathConstants.ROOMS,
      },
      {
        icon: UserManagerIcon,
        text: "Time Slots",
        path: PathConstants.TIME_SLOTS,
      },
    ],
  },

  {
    id: "attendanceManager",
    icon: AttendanceManage,
    text: "Attendance Manager",
    path: PathConstants.ATTENDANCE_MANAGER,
  },
  ,
  {
    id: "log",
    icon: StrangeMonitor,
    text: "Log Manager",
    path: PathConstants.HISTORY_LOG,
    children: [
      {
        // id: "historyLog",
        icon: HistoryLog,
        text: "History Log",
        path: PathConstants.HISTORY_LOG,
      },
      {
        //id: "strange",
        icon: StrangeMonitor,
        text: "Stranger Monitor",
        path: PathConstants.STRANGER_MONITOR,
      },
    ],
  },
];

const LIST_MENU_STUDENT = [
  {
    id: "schedule",
    icon: ScheduleIcon,
    text: "Schedule",
    path: PathConstants.SCHEDULE_STUDENT,
  },
  {
    id: "attendanceReport",
    icon: AttendanceReport,
    text: "Attendance Report",
    path: PathConstants.ATTENDANCE_REPORT,
  },
];
