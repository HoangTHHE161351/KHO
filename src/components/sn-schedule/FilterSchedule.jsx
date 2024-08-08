import { Button, Grid, Stack } from "@mui/material";
import React, { memo, useCallback } from "react";
import { AppDatePicker, AppToastNotify } from "../Common";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "src/redux-store/store";
import dayjs from "dayjs";
import ScheduleModalImport from "./ImportScheduleModal";
import { AppConstants, DataConstants, EnvConstants } from "src/const";
import { ScheduleService } from "src/services";
import useExportExcel from "../sn-user-manager/hooks/useExportExcel";

const FilterSchedule = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.scheduleReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const handleChangeFilterWithKey = useCallback(
    (key) => (value) => {
      const isoDate = value ? dayjs(value).toISOString() : "";
      dispatch(scheduleActions.changeFilterWithKey({ key, value: isoDate }));
    },
    [dispatch]
  );

  const date = dayjs(filter.date);

  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { handleExportExcel } = useExportExcel();

  const handleExportScheduleExcel = async () => {
    try {
      const response = await ScheduleService.exportSchedule();
      if (response.status === 200) {
        const columns = [
          { name: "No", key: "no", width: 10 },
          { name: "Username", key: "username", width: 20 },
          { name: "Fullname", key: "fullname", width: 20 },
          { name: "Email", key: "email", width: 20 },
          { name: "Phone", key: "phone", width: 20 },
          { name: "Role", key: "role", width: 20 },
        ];

        const rows = response?.data?.map((item, index) => ({
          no: index,
          username: item.username,
          fullname: item.lastName + " " + item.firstName,
          email: item.email,
          phone: item.phone,
          role: item.roleName,
        }));

        handleExportExcel({
          columns,
          rows,
          fileName: "Schedule.xlsx",
        });
      } else {
        throw new Error(response?.data?.message || "An error occurred!");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!",
      });
    }
  };

  return (
    <Grid container columnSpacing={2}>
      <Grid item container flexWrap="nowrap" xs={2.4}>
        <AppDatePicker
          label="Date of Schedule"
          value={date}
          onChange={(data) => handleChangeFilterWithKey("date")(data || "")}
        />
      </Grid>
      {userInfo?.roleId !== DataConstants.ROLE.TEACHER && (
        <Grid flex={1} container justifyContent="flex-end">
          <Stack direction={"row"} spacing={1}>
            <Button variant="contained" onClick={handleExportScheduleExcel}>
              Export
            </Button>
            <Button variant="contained" onClick={openModal}>
              Import
            </Button>
          </Stack>
        </Grid>
      )}
      <ScheduleModalImport isOpen={isOpen} onClose={closeModal} />
    </Grid>
  );
};

export default memo(FilterSchedule);
