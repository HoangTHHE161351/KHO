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

const HEADER_CELL = [
  {
    id: "image",
    label: "Image",
    align: "center",
    minWidth: 150,
  },
  {
    id: "name",
    label: "Full Name",
    align: "left",
    minWidth: 150,
  },
  {
    id: "username",
    label: "UserName",
    align: "left",
  },
  {
    id: "email",
    label: "email",
    align: "left",
  },
  {
    id: "delete",
    label: "Delete",
    align: "center",
    className: "fix-width-cell",
  },
];
