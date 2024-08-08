import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DateCell,
  EditCell,
  StatusCell,
  ViewCell,
} from "src/components/Common/TableCommon";
import { DataConstants } from "src/const";
import { PasswordResetIcon } from "src/assets/icons";
import { IconButton } from "@mui/material";
import usePostTeacher from "../hooks/usePostTeacher.js";

const RowTable = ({
  data,
  index,
  onOpenEdit,
  onOpenReset,
  onSuccess,
  onOpenView,
}) => {
  const { handleChangeStatus } = usePostTeacher();

  return (
    <AppTableRow>
      <AppTableCell align="center">{index}</AppTableCell>
      <ViewCell buttonProps={{ onClick: onOpenView }} />
      <EditCell buttonProps={{ onClick: onOpenEdit }} />
      <AppTableCell align="left">{data.username}</AppTableCell>
      <AppTableCell align="left">{data.firstName}</AppTableCell>
      <AppTableCell align="left">{data.lastName}</AppTableCell>
      <AppTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
        {data.email}
      </AppTableCell>
      <AppTableCell align="left">{data.phone}</AppTableCell>
      <AppTableCell align="left">{data.address}</AppTableCell>
      <AppTableCell align="left">{data.gender}</AppTableCell>
      <DateCell align="left" date={data.dob} />

      <StatusCell
        onStatusChange={(_, value) => {
          handleChangeStatus({
            id: data.id,
            status: value
              ? DataConstants.STATUS_TYPE.ACTIVE
              : DataConstants.STATUS_TYPE.INACTIVE,
            onSuccess: () => onSuccess(data.id),
          });
        }}
        status={data.status}
      />
      <AppTableCell align="center">
        <IconButton
          sx={{
            color: "warning.main",
            height: 24,
            width: 24,
          }}
          onClick={onOpenReset}
        >
          <PasswordResetIcon />
        </IconButton>
      </AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
