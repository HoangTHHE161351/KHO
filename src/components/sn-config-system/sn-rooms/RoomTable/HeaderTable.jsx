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
          className={cell.className}
          sx={{
            width: cell.width,
          }}
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
    id: "roomName",
    label: "Room Name",
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
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
    width: 150,
  },
  {
    id: "historyLog",
    label: "History Log",
    align: "center",
    width: 150,
  },
];
