import React, { memo } from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = () => {
  return (
    <>
      <AppIndexCell />
      {HeaderCell.map((cell) => (
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

export default memo(HeaderTable);

const HeaderCell = [
  { id: "edit", label: "Edit", align: "center", className: "fix-width-cell" },
  {
    id: "delete",
    label: "Delete",
    align: "center",
    className: "fix-width-cell",
  },
  { id: "name", label: "Port", align: "left" },
  { id: "ip", label: "IP_Address", align: "left" },
  { id: "roomName", label: "Room", align: "left" },
  { id: "typedevice", label: "Type Device", align: "left" },
  { id: "position", label: "Position", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "accountDevice", label: "Account Device", align: "left" },
];
