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
    id: "code",
    label: "Subject Code",
    align: "left",
  },
  {
    id: "name",
    label: "Subject Name",
    align: "left",
  },
  {
    id: "slots",
    label: "Slot",
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
