import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import { FilterStudentSchedule } from "src/components/sn-schedule";
import TableStudentSchedule from "src/components/sn-schedule/TableStudentSchedule";
import { AppConstants } from "src/const";
import { scheduleActions, timeSlotActions } from "src/redux-store/store";

const ScheduleStudent = () => {
  const dispatch = useDispatch();
  const filterStudent = useSelector(
    (state) => state.scheduleReducer.filterStudent
  );

  const { schoolWeeks } = useSelector((state) => state.timeSlotsReducer);

  useEffect(() => {
    dispatch(timeSlotActions.getScheduleWeeks({ year: filterStudent.year }));
  }, [filterStudent.year, dispatch]);

  useEffect(() => {
    const date = schoolWeeks?.find(
      (item, index) => index === filterStudent.week
    );

    if (date && filterStudent.week) {
      dispatch(
        scheduleActions.getScheduleStudent({
          from: dayjs(date?.firstDate).format(AppConstants.DATE_FORMAT),
          to: dayjs(date?.lastDate).format(AppConstants.DATE_FORMAT),
        })
      );
    }
  }, [filterStudent.week, dispatch, schoolWeeks]);

  useEffect(() => {
    if (schoolWeeks && !filterStudent.week) {
      const week = schoolWeeks?.findIndex(
        (item) =>
          item.firstDate ===
          dayjs(filterStudent.from).format(AppConstants.ISO_DATE_FORMAT)
      );

      if (week === -1) return;
      dispatch(
        scheduleActions.changeFilterStudentWithKey({ key: "week", value: week })
      );
    }
  }, [schoolWeeks, dispatch, filterStudent.from, filterStudent.week]);

  useEffect(() => {
    return () => {
      dispatch(scheduleActions.scheduleReset());
    };
  }, [dispatch]);

  return (
    <AppTablePageLayout headerFilter={<FilterStudentSchedule />}>
      <TableStudentSchedule />
    </AppTablePageLayout>
  );
};

export default ScheduleStudent;
