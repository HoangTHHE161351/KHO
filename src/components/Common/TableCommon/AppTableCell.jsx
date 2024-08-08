import { TableCell } from "@mui/material";
import React, { memo } from "react";

const AppTableCell = ({ sx, children, ...otherProps }) => {
  return (
    <TableCell
      sx={{
        borderTop: "1px solid transparent",
        borderBottom: "1px solid #D9D9D9",
        borderLeft: "1px solid #D9D9D9",
        padding: "2px 16px",
        height: 40,

        "&:first-of-type": {
          borderLeft: "unset",
        },
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </TableCell>
  );
};

export default memo(AppTableCell);
