import { TableContainer } from "@mui/material";
import React, { memo } from "react";

const AppTableContainer = ({ sx, children, ...otherProps }) => {
  return (
    <TableContainer
      sx={{
        width: "100%",
        overflowX: "auto",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderLeft: "1px solid #D9D9D9",
        borderRight: "1px solid #D9D9D9",
        ...sx,
      }}
      className={"custom-scrollbar"}
      {...otherProps}
    >
      {children}
    </TableContainer>
  );
};

export default memo(AppTableContainer);
