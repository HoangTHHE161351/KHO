import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DateCell,
  EditCell,
  StatusCell,
  ViewCell,
} from "src/components/Common/TableCommon";
import usePostUser from "../hooks/usePostUser";
import { DataConstants } from "src/const";
import { PasswordResetIcon } from "src/assets/icons";
import { Button, IconButton } from "@mui/material";

const RowTable = ({
  data,
  index,
  onOpenEdit,
  onOpenReset,
  onOpenFacial,
  onSuccess,
  isView,
}) => {
  const { handleChangeStatus } = usePostUser();

  return (
    <AppTableRow>
      <AppTableCell align="center">{index}</AppTableCell>
      {isView ? (
        <ViewCell buttonProps={{ onClick: onOpenEdit }} />
      ) : (
        <EditCell buttonProps={{ onClick: onOpenEdit }} />
      )}

      <AppTableCell
        align="left"
        sx={{
          whileSpace: "nowrap",
        }}
      >
        {data.username}
      </AppTableCell>
      <AppTableCell align="left">{data.firstName}</AppTableCell>
      <AppTableCell align="left">{data.lastName}</AppTableCell>
      <AppTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
        {data.email}
      </AppTableCell>
      <AppTableCell align="left">{data.phone}</AppTableCell>
      <AppTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
        {data.gender}
      </AppTableCell>
      <DateCell align="left" date={data.dob} />
      <AppTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
        {data.roleName}
      </AppTableCell>
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
      {!isView && (
        <>
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
          <AppTableCell align="center">
            <Button onClick={onOpenFacial}>View</Button>
          </AppTableCell>
        </>
      )}
    </AppTableRow>
  );
};

export default memo(RowTable);
