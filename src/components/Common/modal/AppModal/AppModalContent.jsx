import React, { memo } from "react";
import { DialogContent } from "@mui/material";

const AppModalContent = ({ children, sx, ...otherProps }) => {
  return (
    <DialogContent
      sx={{ p: 0, ...sx }}
      className="custom-scrollbar"
      {...otherProps}
    >
      {children}
    </DialogContent>
  );
};

export default memo(AppModalContent);
