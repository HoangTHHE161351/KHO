import React, { memo } from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = ({ isView }) => {
  const header = isView
    ? HeaderCell.slice(0, HeaderCell.length - 2)
    : HeaderCell;
  return (
    <>
      <AppIndexCell />
      {header.map((column) => {
        return (
          <AppHeaderCell
            key={column.id}
            align={column.align}
            className={column.className}
          >
            {column.id === "edit" && isView ? "View" : column.label}
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
    label: "Edit",
    align: "center",
    className: "fix-width-cell",
  },
  {
    id: "username",
    label: "User Name",
    align: "left",
  },
  // {
  //   id: "view",
  //   label: "Xem",
  //   align: "center",
  //   className: "fix-width-cell",
  // },
  {
    id: "firstName",
    label: "First Name",
    align: "left",
  },
  {
    id: "lastName",
    label: "Last Name",
    align: "left",
  },
  { id: "email", label: "Email", align: "left" },
  {
    id: "phone",
    label: "Phone Number",
    align: "left",
  },
  {
    id: "gender",
    label: "Gender",
    align: "left",
  },
  {
    id: "dob",
    label: "Date of Birth",
    align: "left",
  },
  {
    id: "role",
    label: "Role",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "action",
    label: "Actions",
    align: "left",
  },
  {
    id: "facialData",
    label: "Facial Data",
    align: "left",
  },
];
