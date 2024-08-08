import React, { memo } from "react";
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

export default memo(HeaderTable);

const HEADER_CELL = [
  {
    id: "name",
    label: "Class Name",
    align: "left",
    minWidth: 150,
  },
  {
    id: "description",
    label: "Description",
    align: "left",
    minWidth: 250,
  },
  {
    id: "view",
    label: "Student",
    align: "center",
    className: "fix-width-cell",
  },
  {
    id: "edit",
    label: "Edit",
    align: "center",
    className: "fix-width-cell",
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
