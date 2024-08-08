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
    id: "className",
    label: "Class Name",
    align: "left",
    width: 150,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    width: 100,
  },
  {
    id: "note",
    label: "Error",
    align: "left",
    width: 300,
  },
  {
    id: "empty",
    label: "",
    width: 400,
  },
];

export default Header;
