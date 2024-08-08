import React from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = () => {
  return (
    <>
      <AppIndexCell />
      {HEADER_CELL.map((cell) => (
        <AppHeaderCell
          key={cell.id}
          align={cell.align}
          style={{ minWidth: cell.minWidth }}
          className={cell.className}
        >
          {cell.label}
        </AppHeaderCell>
      ))}
    </>
  );
};

export default HeaderTable;

const HEADER_CELL = [
  {
    id: "code",
    label: "Code",
    align: "left",
    minWidth: 80,
  },
  {
    id: "name",
    label: "Name",
    align: "left",
    minWidth: 150,
  },
  {
    id: "slots",
    label: "Slots",
    align: "left",
  },
  {
    id: "action",
    label: "Delete",
    align: "center",
    className: "fix-width-cell",
  },
];
