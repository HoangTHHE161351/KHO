import React, { memo } from "react";
import AppTableCell from "./AppTableCell";
import { Typography } from "@mui/material";

const AppHeaderCell = ({ sx, children, ...otherProps }) => {
  return (
    <AppTableCell
      sx={{
        backgroundColor: "primary.main",
        color: "common.white",
        whiteSpace: "nowrap",
        ...sx,
      }}
      {...otherProps}
    >
      <Typography fontWeight={500}>{children}</Typography>
    </AppTableCell>
  );
};

export default memo(AppHeaderCell);
