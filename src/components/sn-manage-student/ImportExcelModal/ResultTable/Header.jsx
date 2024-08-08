import React from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const Header = () => {
  return (
    <>
      <AppIndexCell />
      {columns.map((column) => (
        <AppHeaderCell
          key={column.id}
          align={column.align}
          sx={{
            width: column.width,
          }}
        >
          {column.label}
        </AppHeaderCell>
      ))}
    </>
  );
};

const columns = [
  {
    id: "userName",
    label: "User Name",
    align: "left",
    width: 100,
  },
  {
    id: "firstName",
    label: "First Name",
    align: "left",
    width: 150,
  },
  {
    id: "lastName",
    label: "Last Name",
    align: "left",
    width: 150,
  },
  {
    id: "email",
    label: "Email",
    align: "left",
    width: 200,
  },
  {
    id: "role",
    label: "Role",
    align: "left",
    width: 150,
  },
  {
    id: "dob",
    label: "Dob",
    align: "left",
    width: 200,
  },
  {
    id: "gender",
    label: "Gender",
    align: "left",
    width: 150,
  },
  {
    id: "phone",
    label: "Phone",
    align: "left",
    width: 200,
  },
  {
    id: "address",
    label: "Address",
    align: "left",
    width: 350,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    width: 200,
  },
  {
    id: "note",
    label: "Error",
    align: "left",
    width: 300,
  },
];

export default Header;
