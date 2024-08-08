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
    id: "slotName",
    label: "Slot Name",
    align: "left",
  },
  {
    id: "startTime",
    label: "Start Time",
    align: "left",
  },
  {
    id: "endTime",
    label: "End Time",
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "center",
  },
  {
    id: "error",
    label: "Error",
    align: "center",
    width: 250,
  },
];
