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
    id: "view",
    label: "Xem",
    align: "center",
    className: "fix-width-cell",
  },
  {
    id: "fullName",
    label: "Full Name",
    align: "left",
  },
  { id: "email", label: "Email", align: "left" },
  {
    id: "dob",
    label: "Date of Birth",
    align: "left",
  },
  {
    id: "phone",
    label: "Phone Number",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "center",
  },
  {
    id: "empty",
    label: "",
    className: "fix-width-empty-cell",
  },
];
