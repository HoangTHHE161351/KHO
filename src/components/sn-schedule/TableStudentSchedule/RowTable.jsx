import { Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";

const RowTable = ({ data }) => {
  return (
    <AppTableRow
      hover={false}
      sx={{
        height: "80px",
      }}
    >
      <AppTableCell align="left">
        <Typography whiteSpace={"nowrap"}>{data?.[0]}</Typography>
      </AppTableCell>
      {data?.slice(1).map((cell, index) => {
        const dataConvert = cell !== "-" && cell ? JSON.parse(cell) : null;
        return (
          <AppTableCell
            key={index}
            align="left"
            sx={{
              ":hover": dataConvert && {
                bgcolor: "grey.300",
                cursor: "pointer",
              },
            }}
          >
            <Stack>
              {dataConvert?.room && (
                <Typography>Room: {dataConvert?.room}</Typography>
              )}
              {dataConvert?.subjectCode && (
                <Typography>Subject: {dataConvert?.subjectCode}</Typography>
              )}
              {dataConvert?.className && (
                <Typography fontSize={14}>
                  Class: {dataConvert?.className}
                </Typography>
              )}
              {dataConvert?.teacherCode && (
                <Typography fontSize={14}>
                  Teacher: {dataConvert?.teacherCode}
                </Typography>
              )}
            </Stack>
          </AppTableCell>
        );
      })}
    </AppTableRow>
  );
};

export default memo(RowTable);
