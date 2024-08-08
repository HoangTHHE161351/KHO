import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { memo, useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClockIcon, NotifyIcon } from "src/assets/icons";
import MenuIcon from "src/assets/icons/MenuIcon";
// import { ApiConstants, DataConstants, PathConstants } from "src/const";
import { ApiConstants, DataConstants, PathConstants } from "src/const";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";
import {
  getListNotification,
  markedReadNotification,
} from "src/services/Notification.service";
import {
  callModelAPI,
  sendLoadScheduleRq,
} from "src/services/TaskOther.service";

const DELAY = 5000;

const TopBar = ({ open, setOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotify, setAnchorElNotify] = useState(null);
  const [listNoti, setListNoti] = useState([]);
  // const userInfo = useSelector(
  //   (state) => state.authReducer.userInfo,
  //   shallowEqual
  // );
  const navigate = useNavigate();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    Cookies.remove(ApiConstants.ACCESS_TOKEN);
    Cookies.remove(ApiConstants.REFRESH_TOKEN);
    Cookies.remove(ApiConstants.USER_INFO);
    navigate(PathConstants.LOGIN);
  };

  const fetchListNotification = async () => {
    try {
      const response = await getListNotification();
      const data = response?.data?.data?.content || [];
      setListNoti(data);
      //     console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const markReadNotify = async (notify) => {
    console.log(notify);

    try {
      const pageParams = JSON.parse(notify?.pageParams);
      if (
        !notify?.id ||
        !pageParams?.date ||
        !pageParams?.roomId ||
        !pageParams?.notType
      ) {
        return;
      }

      const response = await markedReadNotification(notify?.id);
      const data = response?.data;

      if (data?.code === 200) {
        setAnchorElNotify(null);
        const pageParams = JSON.parse(notify?.pageParams);
        switch (notify?.destinationPage) {
          case "SYNCHRONIZE":
            navigate(PathConstants.USER_MANAGER);
            break;
          case "DEVICE":
            navigate(`${PathConstants.DEVICE_MANAGER}?tab=3`);
            break;
          case "LOGS":
            navigate(
              `${PathConstants.STRANGER_MONITOR}?id=${notify?.id}&date=${dayjs(
                pageParams?.date
              ).format(DEFAULT_DATE_FORMAT)}&roomId=${
                pageParams?.roomId
              }&notType=${pageParams?.notType}`
            );
            break;

          default:
            return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchListNotification();
    }, DELAY);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // TODO: Update UI for noti item
  const renderNotiContent = () => {
    if (Array.isArray(listNoti) && listNoti.length > 0) {
      return listNoti.map((item, index) => (
        <ListItemButton
          onClick={() => markReadNotify(item)}
          key={index}
          sx={{
            py: 1.5,
            px: 2.5,
            mt: "1px",
            ...(Number(item?.isRead) === 0 && {
              bgcolor: "action.selected",
            }),
          }}
        >
          <ListItemText
            primary={item.title}
            secondary={
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    display: "flex",
                    alignItems: "center",
                    color: "text.disabled",
                  }}
                >
                  {item.content}
                </Typography>
                <Stack direction={"row"} spacing={0.5}>
                  <ClockIcon />
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      display: "flex",
                      alignItems: "center",
                      color: "text.disabled",
                    }}
                  >
                    {item.time}
                  </Typography>
                </Stack>
              </Stack>
            }
          />
        </ListItemButton>
      ));
    }

    return undefined;
  };

  // TODO: Update UI for count of noti
  const countOfNoti = useMemo(
    () => listNoti?.filter((item) => Number(item?.isRead) === 0)?.length || 0,
    [listNoti]
  );
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const isStaff = useMemo(() => {
    return userInfo.roleId === DataConstants.ROLE.ADMIN;
  }, [userInfo.roleId]);

  const callModelingApi = async () => {
    try {
      const response = await callModelAPI();
      console.log("API call to modeling endpoint successful");
      console.log(response.data); // Log response data if needed
    } catch (error) {
      console.error("Error calling modeling API:", error);
    }
  };

  const sendLoadScheduleRequest = async () => {
    try {
      const response = await sendLoadScheduleRq();
      console.log("API call to schedule request endpoint successful");
      console.log(response.data); // Log response data if needed
    } catch (error) {
      console.error("Error sending load schedule request:", error);
    }
  };

  return (
    <Box sx={{ ...style.header, height: 60 }}>
      <Stack ml={3} direction="row" spacing={0.5}>
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Stack>
      {isStaff && (
        <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
          <Button onClick={callModelingApi}>
            Add feature_face to Facial records
          </Button>
          <Button onClick={sendLoadScheduleRequest}>
            Update personaType on LCD for users
          </Button>
        </Grid>
      )}
      {/* <Typography fontSize={20} fontWeight={700}>
        Home Page
      </Typography> */}
      <Box sx={style.container}>
        <Badge
          color="info"
          overlap="circular"
          badgeContent={countOfNoti}
          sx={{ mr: 1 }}
        >
          <IconButton
            type="button"
            onClick={(e) => setAnchorElNotify(e.currentTarget)}
          >
            <NotifyIcon />
          </IconButton>
        </Badge>
        <Avatar
          aria-haspopup="true"
          sx={{
            marginRight: "24px",
            border: `1px solid `,
            borderColor: "grey.400",
            cursor: "pointer",
            width: 32,
            height: 32,
          }}
          src={userInfo.avata}
          onClick={handlePopoverOpen}
        />
        <Popover
          sx={{ zIndex: 1200, maxHeight: "300px" }}
          className="custom-scrollbar"
          open={Boolean(anchorElNotify)}
          onClose={() => setAnchorElNotify(null)}
          anchorEl={anchorElNotify}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {renderNotiContent()}
        </Popover>
        <Popover
          id="mouse-over-popover"
          onClose={handlePopoverClose}
          disableRestoreFocus
          sx={{
            marginTop: "8px",
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "8px",
              },
            },
          }}
        >
          {
            <Typography
              sx={{
                width: "186px",
                height: "40px",
                padding: "12px 0 12px 20px",
                cursor: "pointer",
                "&&:hover": {
                  backgroundColor: "grey.100",
                },
              }}
              onClick={() => navigate(PathConstants.PROFILE)}
            >
              My account
            </Typography>
          }
          <Typography
            onClick={handleClickLogout}
            sx={{
              cursor: "pointer",
              color: "red",
              width: "186px",
              height: "40px",
              padding: "12px 0 12px 20px",
              "&&:hover": {
                backgroundColor: "grey.100",
              },
            }}
          >
            Logout
          </Typography>
        </Popover>
      </Box>
    </Box>
  );
};

export default memo(TopBar);
const style = {
  header: {
    maxWidth: "100%",
    width: "100%",
    borderBottom: "1px solid #DBDBDB",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "common.white",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  h4: {
    color: "#243648",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
  },

  contactBox: {
    borderRadius: "100px",
    border: "1px solid #DBDBDB ",
    width: "120px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 8px",
  },
};
