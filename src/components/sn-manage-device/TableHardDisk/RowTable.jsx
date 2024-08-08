import React, { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";

const RowTable = ({ row, order }) => {
  return (
    <AppTableRow>
      <AppTableCell align={"center"}>{order}</AppTableCell>
      <AppTableCell align={"left"}>{row.number}</AppTableCell>
      <AppTableCell align={"left"}>{row.partition}</AppTableCell>
      <AppTableCell align={"right"}>{row.capacity}</AppTableCell>
      <AppTableCell align={"right"}>{row.free}</AppTableCell>
      <AppTableCell align={"left"}>{row.type}</AppTableCell>
      <AppTableCell align={"left"}>{row.signal}</AppTableCell>
      <AppTableCell align={"left"}>{row.status}</AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
