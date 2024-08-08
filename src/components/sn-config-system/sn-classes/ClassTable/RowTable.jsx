import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
  EditCell,
  ViewCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ order, data, onEdit, onDelete, onView }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>

      <AppTableCell align="left">{data.className}</AppTableCell>
      <AppTableCell align="left">{data.description}</AppTableCell>
      <ViewCell
        buttonProps={{
          onClick: onView,
        }}
      />
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
      <AppTableCell align="center">{data.status}</AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
