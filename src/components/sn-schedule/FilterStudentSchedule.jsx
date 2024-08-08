import { Grid } from "@mui/material";
import React, { memo, useCallback } from "react";
import { AppMenuItem, AppSelectFilter } from "../Common";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "src/redux-store/store";
import { LIST_SCHOOL_YEAR } from "src/const/app.const";

const FilterStudentSchedule = () => {
  const dispatch = useDispatch();
  const { filterStudent } = useSelector((state) => state.scheduleReducer);
  const { schoolWeeks } = useSelector((state) => state.timeSlotsReducer);

  const handleChangeFilterWithKey = useCallback(
    (key) => (value) => {
      dispatch(scheduleActions.changeFilterStudentWithKey({ key, value }));
    },
    [dispatch]
  );

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={2.4}>
        <AppSelectFilter
          labelId="year"
          value={filterStudent.year}
          onChangeValue={handleChangeFilterWithKey("year")}
          label="School Year"
        >
          {LIST_SCHOOL_YEAR.map((item) => (
            <AppMenuItem value={item.id} key={item.id}>
              {item.label}
            </AppMenuItem>
          ))}
        </AppSelectFilter>
      </Grid>
      <Grid item xs={2.4}>
        <AppSelectFilter
          labelId="week"
          value={filterStudent.week}
          onChangeValue={handleChangeFilterWithKey("week")}
          label="School Weeks"
        >
          {schoolWeeks.map((item, index) => (
            <AppMenuItem value={index} key={index}>
              {item.firstDate + " - " + item.lastDate}
            </AppMenuItem>
          ))}
        </AppSelectFilter>
      </Grid>
    </Grid>
  );
};

export default memo(FilterStudentSchedule);
