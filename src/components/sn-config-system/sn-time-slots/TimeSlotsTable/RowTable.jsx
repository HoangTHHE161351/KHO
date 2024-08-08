import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
  EditCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ data, order, onEdit, onDelete }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>

      <AppTableCell>{data.slotName}</AppTableCell>
      <AppTableCell>{data.startTime}</AppTableCell>
      <AppTableCell>{data.endTime}</AppTableCell>
      <AppTableCell>{data.description}</AppTableCell>
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
      <AppTableCell
        align="center"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data.status}
      </AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
