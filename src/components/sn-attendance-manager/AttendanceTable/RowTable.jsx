import React, { memo, useState } from "react";
import { AppTableRow, AppTableCell } from "src/components/Common/TableCommon"; // Ví dụ import các thành phần cần thiết
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const TableRowComponent = ({
  index,
  attendanceData,
  page,
  size,
  changeMasterData,
}) => {
  const [status, setStatus] = useState(attendanceData?.status);
  const handleOnChange = (event) => {
    attendanceData = { ...attendanceData, status: event.target.value };
    changeMasterData(attendanceData);
  };
  return (
    <>
      <AppTableRow key={index}>
        <AppTableCell align="center">
          {index + 1 + size * (page - 1)}
        </AppTableCell>
        <AppTableCell align="left">{attendanceData?.attendenceId}</AppTableCell>
        <AppTableCell align="left">
          {attendanceData?.firstName + " " + attendanceData?.lastName}
        </AppTableCell>
        <AppTableCell align="left">{attendanceData?.roleName}</AppTableCell>
        <AppTableCell align="left">{attendanceData?.email}</AppTableCell>
        <AppTableCell align="left">{attendanceData?.phoneNum}</AppTableCell>
        <AppTableCell align="left">
          {attendanceData?.gender && attendanceData?.gender === 1
            ? "Female"
            : "Male"}
        </AppTableCell>
        <AppTableCell align="left">{attendanceData?.dob}</AppTableCell>
        {/* <AppTableCell align="left">{attendanceData.status}</AppTableCell> */}
        <AppTableCell align="left">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={attendanceData.status}
            name="radio-buttons-group"
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
            onChange={handleOnChange}
          >
            <FormControlLabel
              value="ABSENT"
              control={<Radio />}
              label="Absent"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "red", // Label color
                },
              }}
            />
            <FormControlLabel
              value="ATTEND"
              control={<Radio />}
              label="Attend"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "green", // Label color
                },
              }}
            />
          </RadioGroup>
        </AppTableCell>
      </AppTableRow>
    </>
  );
};

export default memo(TableRowComponent);
