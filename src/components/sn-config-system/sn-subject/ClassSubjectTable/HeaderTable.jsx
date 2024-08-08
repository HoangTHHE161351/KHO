import React from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = () => {
  return (
    <>
      <AppIndexCell />
      {HEADER_CELL.map((cell) => (
        <AppHeaderCell key={cell.id} align={cell.align}>
          {cell.label}
        </AppHeaderCell>
      ))}
    </>
  );
};

export default HeaderTable;

const HEADER_CELL = [
  { id: "name", label: "Name", align: "left" },
  { id: "description", label: "description", align: "left" },
  {
    id: "action",
    label: "Delete",
    align: "center",
    className: "fix-width-cell",
  },
];
