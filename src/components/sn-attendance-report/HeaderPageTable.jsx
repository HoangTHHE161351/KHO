import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AppSearchDebounce } from "src/components/Common";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  getClassRoomPickerData,
} from "src/services/Room.service";

import { getSemesterPickerData } from "src/services/Semester.service";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";

const HeaderPageTable = ({
  getSearchKey,
  getDateSelection,
  getSemesterSelection,
  getClassroomSelection,
  dateDisable = false,
  clRoompkDisable = false,
  semesterPkDisable = false,
  hiddenSearch = false,
  hiddenDatePk = false,
  hiddenSemester = false,
  hiddenClRoomSl = false,
}) => {
  const [searchKey, setSearchKey] = useState("");
  const [_, setDate] = useState("");
  const [semester, setSemester] = React.useState("");
  const [classroom, setClassroom] = React.useState("");
  const [classRoomData, setClassRoomData] = React.useState([]);
  const [semesterData, setSemesterData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getClassroomData = useCallback(async () => {
    try {
      const res = await getClassRoomPickerData();
      const { data } = res;
      return data;
    } catch (error) {
      //TODO: handle error
      return [];
    }
  }, []);

  const getSemesterData = useCallback(async () => {
    try {
      const res = await getSemesterPickerData();
      const { data } = res;
      return data;
    } catch (error) {
      //TODO: handle error
      return [];
    }
  }, []);

  const initSetup = useCallback(async () => {
    setIsLoading(true);
    const classResponse = await getClassroomData();
    const SemesterResponse = await getSemesterData();
    const { code: clrCode, data: clrData } = classResponse;
    const { code: semesterCode, data: semesterData } = SemesterResponse;

    if (!!clrData && clrCode === 200) {
      setClassRoomData(clrData);
    }

    if (!!semesterData && semesterCode === 200) {
      setSemesterData(semesterData);
    }

    setIsLoading(false);
  }, [getClassroomData, getSemesterData]);

  useEffect(() => {
    initSetup();
  }, [initSetup]);

  const handleChangeSearchKey = (value) => {
    setSearchKey(value);
    Boolean(getSearchKey) && getSearchKey(value); // Call back to parent component
  };

  const handleChangeDate = (value, _) => {
    const dateFormatted = dayjs(value).format(DEFAULT_DATE_FORMAT);
    setDate(dateFormatted);
    Boolean(getDateSelection) && getDateSelection(dateFormatted);
  };

  const handleChangeClassroom = (event) => {
    const classroom = event.target.value;
    setClassroom(classroom);
    Boolean(getClassroomSelection) && getClassroomSelection(classroom); // Call back to parent component
  };

  const handleChangeSemester = (event) => {
    const semester = event.target.value;
    setSemester(semester);
    Boolean(getSemesterSelection) && getSemesterSelection(semester); // Call back to parent component
  };

  return (
    <Grid container spacing={2}>
      {!hiddenSearch && (
        <Grid item xs={4} sm={4} md={2}>
          <AppSearchDebounce
            onChangeValue={handleChangeSearchKey}
            fullWidth
            valueInput={searchKey}
            inputProps={{
              placeholder: "Search",
            }}
          />
        </Grid>
      )}
      {!hiddenDatePk && (
        <Grid item xs={10} ml={2} sm={2} mt={-1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                defaultValue={dayjs()}
                label="Choose Date"
                format={DEFAULT_DATE_FORMAT}
                formatDensity={DEFAULT_DATE_FORMAT}
                onChange={handleChangeDate}
                disabled={dateDisable}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      )}
      {!hiddenSemester && (
        <Grid item xs={6} sm={1} md={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-readonly-label">Semester</InputLabel>
            <Select
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={semester}
              onChange={handleChangeSemester}
              inputProps={{ readOnly: semesterPkDisable }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                semesterData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.semesterName}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
      )}
      {!hiddenClRoomSl && (
        <Grid item xs={6} sm={1} md={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-readonly-label">Classroom</InputLabel>
            <Select
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={classroom}
              onChange={handleChangeClassroom}
              inputProps={{ readOnly: clRoompkDisable }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                classRoomData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.className}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(HeaderPageTable);
