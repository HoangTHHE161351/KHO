import React from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ order, onDelete, data }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>
      <AppTableCell>{data.subjectCode}</AppTableCell>
      <AppTableCell>{data.subjectName}</AppTableCell>
      <DeleteCell
        buttonProps={{
          onClick: onDelete,
        }}
      />
      <AppTableCell align="center">{data.status}</AppTableCell>
    </AppTableRow>
  );
};

export default RowTable;
