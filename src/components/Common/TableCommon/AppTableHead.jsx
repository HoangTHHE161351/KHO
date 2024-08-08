import { TableHead } from "@mui/material";
import React, { memo } from "react";
import AppTableRow from "./AppTableRow";

const AppTableHead = ({ children, ...otherProps }) => {
  return (
    <TableHead
      sx={{
        "& .MuiTableRow-root th:first-of-type": {
          borderTopLeftRadius: 10,
        },
        "& .MuiTableRow-root th:last-of-type": {
          borderTopRightRadius: 10,
        },
      }}
      {...otherProps}
    >
      <AppTableRow>{children}</AppTableRow>
    </TableHead>
  );
};

export default memo(AppTableHead);
