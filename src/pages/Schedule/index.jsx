import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import { FilterSchedule, TableSchedule } from "src/components/sn-schedule";
import { AppConstants } from "src/const";
import {
  roomActions,
  scheduleActions,
  semesterActions,
  timeSlotActions,
} from "src/redux-store/store";

const Attendance = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.scheduleReducer.filter);

  useEffect(() => {
    dispatch(
      scheduleActions.getScheduleList({
        date: dayjs(filter.date).format(AppConstants.DATE_FORMAT),
      })
    );
  }, [filter, dispatch]);

  useEffect(() => {
    dispatch(semesterActions.getSemesterListRequest({}));
    dispatch(roomActions.getRoomList({}));
    dispatch(timeSlotActions.getTimeSlotsList({}));

    return () => {
      dispatch(scheduleActions.scheduleReset());
    };
  }, [dispatch]);

  return (
    <AppTablePageLayout headerFilter={<FilterSchedule />}>
      <TableSchedule />
    </AppTablePageLayout>
  );
};

export default Attendance;
