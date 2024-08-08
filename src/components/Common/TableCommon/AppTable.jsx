import { Table } from "@mui/material";
import React, { memo } from "react";

const AppTable = ({ children, ...otherProps }) => {
  return (
    <Table stickyHeader {...otherProps}>
      {children}
    </Table>
  );
};

export default memo(AppTable);
