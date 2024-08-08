import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AppSearchDebounce, AppToastNotify } from "src/components/Common";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  getClassRoomPickerData,
  getRoomPickerData,
} from "src/services/Room.service";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";
import { AppConstants, EnvConstants } from "src/const";

const HeaderPageTable = ({
  getSearchKey,
  getDateSelection,
  getRoomSelection,
  getClassRoomSelection,
  dateDisable = false,
  roomPkDisable = false,
  clRoompkDisable = false,
  hiddenSearch = false,
  hiddenDatePk = false,
  hiddenRoomSl = false,
  hiddenClRoomSl = false,
}) => {
  const [searchKey, setSearchKey] = useState("");
  const [_, setDate] = useState("");
  const [room, setRoom] = React.useState("");
  const [classroom, setClassroom] = React.useState("");
  const [classRoomData, setClassRoomData] = React.useState([]);
  const [roomData, setRoomData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getRoomData = useCallback(async () => {
    try {
      const res = await getRoomPickerData();
      const { data } = res;
      return data;
    } catch (error) {
      //TODO: handle error
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      return [];
    }
  }, []);

  const getClassRoomData = useCallback(async () => {
    try {
      const res = await getClassRoomPickerData();
      const { data } = res;
      return data;
    } catch (error) {
      //TODO: handle error
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      return [];
    }
  }, []);

  const initSetup = useCallback(async () => {
    setIsLoading(true);
    const roomResponse = await getRoomData();
    const classRoomResponse = await getClassRoomData();
    const { code: rCode, data: rData } = roomResponse;
    const { code, data } = classRoomResponse;

    if (!!data && code === 200) {
      setClassRoomData(data);
    }

    if (!!rData && rCode === 200) {
      setRoomData(rData);
    }

    setIsLoading(false);
  }, [getClassRoomData, getRoomData]);

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

  const handleChangeRoom = (event) => {
    console.log('handleChangeRoom : ',event);
    const sl = event.target.value;
    setRoom(sl);
    Boolean(getRoomSelection) && getRoomSelection(sl); // Call back to parent component
  };

  const handleChangeClassRoom = (event) => {
    const sl = event.target.value;
    setClassroom(sl);
    Boolean(getClassRoomSelection) && getClassRoomSelection(sl); // Call back to parent component
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
      {!hiddenRoomSl && (
        <Grid item xs={6} sm={1} md={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-readonly-label">Room</InputLabel>
            <Select
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={room}
              onChange={handleChangeRoom}
              inputProps={{ readOnly: roomPkDisable }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                roomData.map((item) => (
                  <MenuItem value={item.id} >{item.roomName}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
      )}
      {!hiddenClRoomSl && (
        <Grid item xs={2} sm={3} md={1.3}>
          <FormControl fullWidth>
            <InputLabel id="classroom-label">Classroom</InputLabel>
            <Select
              labelId="classroom-picker"
              id="classroom-picker"
              value={classroom}
              onChange={handleChangeClassRoom}
              inputProps={{ readOnly: clRoompkDisable }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isLoading ? (
                <CircularProgress />
              ) : (
                classRoomData.map((item) => (
                  <MenuItem value={item.id}>{item.className}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
      )}
      {/* <RoomModalEdit open={open} onClose={() => setOpen(false)} /> */}
    </Grid>
  );
};

export default memo(HeaderPageTable);
