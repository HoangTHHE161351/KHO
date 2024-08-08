import React, { memo, useState } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";
import { Button } from "@mui/material";


const RowTable = ({ index, page, size, attendReportData }) => {
  const {
    room,
    day,
    learnDate,
    teacherCode,
    className,
    subjectCode,
    slot,
    description,
    status
  } = attendReportData;

  return (
    <AppTableRow key={index + 1}>
      <AppTableCell align="center">{index + 1 + size * (page - 1)}</AppTableCell>
      <AppTableCell align="left">{room}</AppTableCell>
      <AppTableCell align="left">{day}</AppTableCell>
      <AppTableCell align="left">{learnDate}</AppTableCell>
      <AppTableCell align="left">{teacherCode}</AppTableCell>
      <AppTableCell align="left">{className}</AppTableCell>
      <AppTableCell align="left">{subjectCode}</AppTableCell>
      <AppTableCell align="left">{slot}</AppTableCell>
      <AppTableCell align="left">{description}</AppTableCell>
      <AppTableCell align="left">{status}</AppTableCell>
    </AppTableRow>
  );
};
export default memo(RowTable);
