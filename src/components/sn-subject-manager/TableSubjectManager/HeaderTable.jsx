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
    id: "edit",
    label: "Sửa",
    align: "center",
    className: "fix-width-cell",
  },
  {
    id: "name",
    label: "Subject Name",
    align: "left",
  },
  {
    id: "code",
    label: "Code",
    align: "left",
  },
  {
    id: "slot",
    label: "Slots",
    align: "right",
  },
  {
    id: "status",
    label: "Status",
    align: "center",
    className: "fix-width-cell",
  },
  {
    id: "empty",
    label: "",
    className: "fix-width-empty-cell",
  },
];
