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
  { id: "subjectCode", label: "Code", align: "left" },
  {
    id: "subjectName",
    label: "Name",
    align: "left",
  },
  {
    id: "delete",
    label: "Delete",
    align: "center",
    className: "fix-width-cell",
  },
  {
    id: "status",
    label: "Status",
    align: "center",
  },
];
