import { Stack, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";
import { DataConstants } from "src/const";
import { getCameraAccessByRoom } from "src/services/Device.service";

const RowTable = ({ data, onClickDetail, onClickLog }) => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);

  const [cameraAccess, setCameraAccess] = useState([]);
  const getCameraAccessByRoomFunc = async (data) => {
    try {
      console.log("Data passed to getCameraAccessByRoom:", data);

      const params = { roomId: data?.roomId };
      const response = await getCameraAccessByRoom(params);
      console.log("Response:", response);
      const dataAccess = response?.payload?.data;
      console.log("dataAccess:", dataAccess);
      if (dataAccess) {
        setCameraAccess(dataAccess);
        console.log("cameraAccess:", cameraAccess);
      }
    } catch (error) {
      console.log("Error fetching camera access:", error);
    }
  };
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
        const data = JSON.parse(cell);

        return (
          <AppTableCell
            key={index}
            align="left"
            sx={{
              ":hover": data && {
                bgcolor: "grey.300",
                cursor: "pointer",
              },
            }}
            onClick={() => {
              onClickDetail(data);
            }}
          >
            <Stack>
              {(data?.className || data?.subjectCode) && (
                <Typography>
                  {data?.className} {data?.subjectCode}
                </Typography>
              )}
              {data?.teacherCode && (
                <Typography fontSize={14}>
                  Teacher: {data?.teacherCode}
                </Typography>
              )}{" "}
              {data?.id && userInfo.roleId === DataConstants.ROLE.TEACHER && (
                <Stack direction={"row"} spacing={2}>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: "grey.600",
                      ":hover": {
                        color: "text.primary",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      onClickDetail(data);
                      console.log("abc", data);
                    }}
                  >
                    Check Attend
                  </Typography>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: "grey.600",
                      ":hover": {
                        color: "text.primary",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => onClickLog(data)}
                  >
                    Check Log
                  </Typography>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: "grey.600",
                      ":hover": {
                        color: "text.primary",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={(event) => {
                      event.stopPropagation(); // Stop propagation to prevent opening the modal
                      getCameraAccessByRoomFunc(data); // Pass 'data' to the function
                    }}
                  >
                    Account Device
                  </Typography>
                </Stack>
              )}
            </Stack>
          </AppTableCell>
        );
      })}
    </AppTableRow>
  );
};

export default memo(RowTable);

// {"id":5,"className":"SE1635","subjectCode":"SE104","teacherCode":"tungtdhe162589"}
