import React, { memo } from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = () => {
  return (
    <>
      <AppIndexCell />
      {HEADER_CELL?.map((cell) => (
        <AppHeaderCell key={cell.id} align={cell.align}>
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
    align: "left",
    label: "Name",
  },
  {
    id: "image",
    align: "center",
    label: "Face Image",
  },
  {
    id: "device",
    align: "left",
    label: "Device",
  },
  {
    id: "room",
    align: "left",
    label: "Room",
  },
  {
    id: "time",
    align: "left",
    label: "Check In",
  },
  {
    id: "type",
    align: "left",
    label: "Type",
  },
];
