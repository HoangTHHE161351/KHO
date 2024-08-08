import React, { memo } from "react";
import { Typography } from "@mui/material";

const AppModalTitle = ({ children, ...otherProps }) => {
  return (
    <Typography
      id="modal-title"
      fontSize={24}
      fontWeight={600}
      pb={2}
      pl={3}
      pr={6.5}
      {...otherProps}
    >
      {children}
    </Typography>
  );
};

export default memo(AppModalTitle);
