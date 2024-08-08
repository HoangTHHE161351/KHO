import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
  EditCell,
  ViewCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ data, order, onEdit, onDelete, onOpenView }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>
      <AppTableCell>{data.curriculumName}</AppTableCell>
      <AppTableCell>{data.description}</AppTableCell>
      <ViewCell
        buttonProps={{
          onClick: onOpenView,
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
