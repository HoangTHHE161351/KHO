import React from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ data, order, onDelete }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>
      <AppTableCell align="left">{data.name}</AppTableCell>
      <AppTableCell align="left">{data.description}</AppTableCell>
      <DeleteCell
        buttonProps={{
          onClick: onDelete,
        }}
      />
    </AppTableRow>
  );
};

export default RowTable;
