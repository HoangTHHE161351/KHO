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
    id: "attendenceId",
    label: "Attendence Id",
    align: "center",
  },
  {
    id: "fullName",
    label: "Full Name",
    align: "center",
  },
  {
    id: "roleName",
    label: "Role Name",
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    align: "center",
  }, 
  {
    id: "phoneNum",
    label: "Phone Number",
    align: "center",
  },
  {
    id: "gender",
    label: "Gender",
    align: "center",
  },
  {
    id: "dob",
    label: "Dob",
    align: "center",
  }, 
  {
    id: "status",
    label: "Status",
    align: "center",
  },
];
