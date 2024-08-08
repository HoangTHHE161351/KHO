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
  getRoomPickerData,
} from "src/services/Room.service";

import { getTimeSlotsList } from "src/services/TimeSlots.service";
import { getSubjectPickerData } from "src/services/Subject.service";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";

const HeaderPageTable = ({
  getSearchKey,
  getDateSelection,
  getRoomSelection,
  getSlotSelection,
  getClassroomSelection,
  getSubjectSelection,
  dateDisable = false,
  roomPkDisable = false,
  clRoompkDisable = false,
  sbjectPkDisable = false,
  semesterPkDisable = false,
  hiddenSearch = false,
  hiddenDatePk = false,
  hiddenRoomSl = false,
  hiddenSubject = false,
  hiddenSemester = false,
  hiddenClRoomSl = false,
}) => {
  const [searchKey, setSearchKey] = useState("");
  const [_, setDate] = useState("");
  const [slot, setSlot] = React.useState("");
  const [classroom, setClassroom] = React.useState("");
  const [classRoomData, setClassRoomData] = React.useState([]);
  const [subjectData, setSubjectData] = React.useState([]);
  const [slotData, setSlotData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [subject, setSubject] = useState("");

  //Call API here to input data to historyLogs

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

  const get = useCallback(async () => {
    try {
      const res = await getTimeSlotsList();
      const { data } = res;
      return data;
    } catch (error) {
      //TODO: handle error
      return [];
    }
  }, []);

  const getSubjectData = useCallback(async () => {
    try {
      const res = await getSubjectPickerData();
      const { data } = res;
      return data;
    } catch (error) {
      //TODO: handle error
      return [];
    }
  }, []);

  const initSetup = useCallback(async () => {
    setIsLoading(true);
    const subjectResponse = await getSubjectData();
    const classResponse = await getClassroomData();
    const timeSlotResponse = await getTimeSlotsList();
    const { code: sbjCode, data: sbjData } = subjectResponse;
    const { code: clrCode, data: clrData } = classResponse;

    if (!!sbjData && sbjCode === 200) {
      setSubjectData(sbjData);
    }

    if (!!clrData && clrCode === 200) {
      setClassRoomData(clrData);
    }

    if (!!timeSlotResponse)
      setSlotData(timeSlotResponse.data.data.content);

    setIsLoading(false);
  }, [getClassroomData, getTimeSlotsList, getSubjectData]);

  useEffect(() => {
    initSetup();
  }, [initSetup]);

  const handleChangeSearchKey = (value) => {
    console.log('Key : ',value.key);
    if(value.key === 'Enter')
      console.log('Search : ',value);
    setSearchKey(value);
    Boolean(getSearchKey) && getSearchKey(value); // Call back to parent component
  };

  const handleChangeDate = (value, _) => {
    const dateFormatted = dayjs(value).format(DEFAULT_DATE_FORMAT);
    setDate(dateFormatted);
    Boolean(getDateSelection) && getDateSelection(dateFormatted);
  };

  const handleChangeSubject = (event) => {
    const subject = event.target.value;
    setSubject(subject);
    Boolean(getSubjectSelection) && getSubjectSelection(subject); // Call back to parent component
  };

  const handleChangeClassroom = (event) => {
    const classroom = event.target.value;
    setClassroom(classroom);
    Boolean(getClassroomSelection) && getClassroomSelection(classroom); // Call back to parent component
  };

  const handleChangeSlot = (event) => {
    const slot = event.target.value;
    setSlot(slot);
    Boolean(getSlotSelection) && getSlotSelection(slot); // Call back to parent component
  };

  return (
    <Grid container spacing={2}>
      {!hiddenSearch && (
        <Grid item xs={4} sm={4} md={2}>
          <AppSearchDebounce
            key={(e) => handleChangeSearchKey}
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
            <InputLabel id="demo-simple-select-readonly-label">Slot</InputLabel>
            <Select
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={slot}
              onChange={handleChangeSlot}
              inputProps={{ readOnly: semesterPkDisable }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                slotData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
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
      {!hiddenSubject && (
        <Grid item xs={6} sm={1} md={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-readonly-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={subject}
              onChange={handleChangeSubject}
              inputProps={{ readOnly: sbjectPkDisable }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                subjectData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
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
