import { TableRow } from "@mui/material";
import React, { memo } from "react";

const AppTableRow = ({ sx, children, ...otherProps }) => {
  return (
    <TableRow
      hover
      sx={{
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </TableRow>
  );
};

export default memo(AppTableRow);
