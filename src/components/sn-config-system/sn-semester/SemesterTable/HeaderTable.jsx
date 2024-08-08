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
          sx={{
            minWidth: cell.minWidth,
          }}
        >
          {cell.label}
        </AppHeaderCell>
      ))}
    </>
  );
};

export default memo(HeaderTable);

export const HEADER_CELL = [
  {
    id: "semesterName",
    label: "Semester Name",
    align: "left",
    minWidth: 120,
  },
  {
    id: "startTime",
    label: "Start Time",
    align: "left",
    minWidth: 100,
  },
  {
    id: "endTime",
    label: "End Time",
    align: "left",
    minWidth: 100,
  },
  {
    id: "description",
    label: "Description",
    align: "left",
    minWidth: 150,
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
    minWidth: 100,
  },
];
