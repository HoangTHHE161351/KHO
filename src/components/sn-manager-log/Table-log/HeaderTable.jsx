import React, { memo } from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = () => {
  return (
    <>
      <AppIndexCell />
      {HeaderCell.map((column) => {
        return (
          <AppHeaderCell
            key={column.id}
            align={column.align}
            className={column.className}
          >
            {column.label}
          </AppHeaderCell>
        );
      })}
    </>
  );
};

export default memo(HeaderTable);

const HeaderCell = [
  {
    id: "roomName",
    label: "Room Name",
    align: "left",
  },
    {
    id: "userName",
    label: "User Name",
    align: "left",
  },
  {
    id: "name",
    label: "Full Name",
    align: "left",
  },
  {
    id: "checkIn",
    label: "Check In",
    align: "left",
  },
  {
    id: "checkOut",
    label: "Check Out",
    align: "left",
  },
  {
    id: "note",
    label: "Note",
    align: "left",
  },
  {
    id: "history",
    label: "History detail",
    align: "left",
  }
];
