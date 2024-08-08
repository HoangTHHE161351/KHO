import React, { memo } from "react";
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

export default memo(HeaderTable);

const HEADER_CELL = [
  {
    id: "number",
    label: "Number",
    align: "left",
  },
  {
    id: "partition",
    label: "Partition",
    align: "left",
  },
  {
    id: "capacity",
    label: "Capacity",
    align: "right",
  },
  {
    id: "free",
    label: "Free",
    align: "right",
  },
  {
    id: "type",
    label: "Type",
    align: "left",
  },
  {
    id: "signal",
    label: "Signal",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
];
