import { Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { AppCheckbox } from "src/components/Common";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";
import AvatarDefault from "src/assets/images/user-default.png";
import { DataConstants } from "src/const";
import { useMemo } from "react";

const RowTable = ({ data, order, onCheckAttend }) => {
  const isChecked = useMemo(
    () => data?.status === DataConstants.STATUS_TYPE.ATTEND,
    [data?.status]
  );

  return (
    <>
      <AppTableRow>
        <AppTableCell align="center">{order + 1}</AppTableCell>
        <AppTableCell align="center">
          <img
            src={data?.avata || AvatarDefault}
            alt={data?.name}
            height={80}
            width={50}
          />
        </AppTableCell>
        <AppTableCell align="left">{data?.name}</AppTableCell>
        <AppTableCell align="left">{data?.userName}</AppTableCell>
        <AppTableCell align="left">{data?.className}</AppTableCell>
        <AppTableCell align="left">{data?.description}</AppTableCell>
        <AppTableCell align="center">{data?.status}</AppTableCell>
        <AppTableCell align="center">
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <AppCheckbox
              defaultChecked={isChecked}
              onClick={() => onCheckAttend(data?.id)}
            />
            <Typography>Attend</Typography>
          </Stack>
        </AppTableCell>
      </AppTableRow>
    </>
  );
};

export default memo(RowTable);
