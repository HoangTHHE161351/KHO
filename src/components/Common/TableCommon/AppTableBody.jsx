import { TableBody } from "@mui/material";
import React, { memo } from "react";

const AppTableBody = ({ sx, children, ...otherProps }) => {
  return (
    <TableBody
      sx={{
        "& tr:nth-of-type(even)": {
          backgroundColor: "#F9F9F9",
        },
        "& tr td:first-of-type": {
          borderLeft: "1px solid #D9D9D9",
        },
        "& tr td:last-of-type": {
          borderRight: "1px solid #D9D9D9",
        },
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </TableBody>
  );
};

export default memo(AppTableBody);
