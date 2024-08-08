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
  { id: "avatar", label: "Avatar", align: "center" },
  { id: "name", label: "Full Name", align: "left" },
  { id: "userName", label: "Username", align: "left" },
  { id: "className", label: "Class", align: "left" },
  { id: "description", label: "Description", align: "left" },
  { id: "status", label: "Status", align: "center" },
  { id: "attendance", label: "Attendance", align: "center" },
];
