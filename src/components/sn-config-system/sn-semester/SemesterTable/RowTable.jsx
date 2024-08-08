import dayjs from "dayjs";
import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
  EditCell,
} from "src/components/Common/TableCommon";
import { AppConstants } from "src/const";

const RowTable = ({ data, order, onEdit, onDelete }) => {
  return (
    <AppTableRow>
      <AppTableCell align={"center"}>{order}</AppTableCell>
      <AppTableCell align={"left"}>{data.semesterName}</AppTableCell>
      <AppTableCell align={"left"}>
        {dayjs(data.startTime).format(AppConstants.DATE_FORMAT)}
      </AppTableCell>
      <AppTableCell align={"left"}>
        {dayjs(data.endTime).format(AppConstants.DATE_FORMAT)}
      </AppTableCell>
      <AppTableCell align={"left"}>{data.description}</AppTableCell>
      <EditCell
        buttonProps={{
          onClick: onEdit,
        }}
      />
      <DeleteCell
        buttonProps={{
          onClick: onDelete,
        }}
      />
      <AppTableCell align={"center"}>{data.status}</AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
