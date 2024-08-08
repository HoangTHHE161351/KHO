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
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";

const HeaderPageTable = ({
  dateUrlPrm,
  roomUrlPrm,
  typeUrlPrm,
  getSearchKey,
  getDateSelection,
  getRoomSelection,
  getClassRoomSelection,
  getTypeSelection,
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
  const [typeSelected, setTypeSelected] = useState(null);
  const [classroom, setClassroom] = React.useState("");
  const [classRoomData, setClassRoomData] = React.useState([]);
  const [roomData, setRoomData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [type, setType] = useState("");

  const typeOptions = [
    { id: -1, value: "Unknown" },
    { id: 1, value: "Identified" },
    { id: 0, value: "Unidentified" },
    { id: 2, value: "Unauthorized" },
  ];

  const getRoomData = useCallback(async () => {
    try {
      const res = await getRoomPickerData();
      const { data } = res;
      return data;
    } catch (error) {
      //TODO: handle error
      return [];
    }
  }, []);

  const initSetup = useCallback(async () => {
    setIsLoading(true);
    const roomResponse = await getRoomData();
    const { code: rCode, data: rData } = roomResponse;

    if (!!rData && rCode === 200) {
      setRoomData(rData);
    }

    setIsLoading(false);
  }, [getRoomData]);

  useEffect(() => {
    initSetup();
  }, [initSetup]);

  useEffect(() => {
    if (dateUrlPrm) {
      handleChangeDate(dateUrlPrm);
    }

    if (roomUrlPrm) {
      handleChangeRoom({ target: { value: roomUrlPrm } });
    }

    if (typeUrlPrm) {
      handleChangeType({ target: { value: typeUrlPrm } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateUrlPrm, roomUrlPrm, typeUrlPrm]);

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
    const sl = event.target.value;
    setRoom(sl);
    Boolean(getRoomSelection) && getRoomSelection(sl); // Call back to parent component
  };

  const handleChangeType = (event) => {
    const selectedType = event.target.value;
    setTypeSelected(selectedType);
    // Call back to parent component if needed
    Boolean(getTypeSelection) && getTypeSelection(selectedType);
  };

  return (
    <Grid container spacing={2}>
      {!hiddenSearch && (
        <Grid item xs={2} sm={4} md={2}>
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
      {/* {!hiddenDatePk && (
        <Grid item xs={6} ml={2} sm={2} mt={-1} width={150}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                defaultValue={dayjs(dateUrlPrm, DEFAULT_DATE_FORMAT) || dayjs()}
                label="Choose Date"
                format={DEFAULT_DATE_FORMAT}
                formatDensity={DEFAULT_DATE_FORMAT}
                onChange={handleChangeDate}
                disabled={dateDisable}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      )} */}
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
        <Grid item xs={2} sm={1} md={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-readonly-label">Room</InputLabel>
            <Select
              defaultValue={roomUrlPrm}
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
                  <MenuItem key={item.id} value={item.id}>
                    {item.roomName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
      )}
      <Grid item xs={2} sm={1} md={1}>
        <FormControl fullWidth>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            defaultValue={typeUrlPrm}
            labelId="type-select-label"
            id="type-select"
            value={typeSelected}
            onChange={handleChangeType}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {typeOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default HeaderPageTable;
