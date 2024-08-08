import React, { memo } from "react";
import { DialogActions } from "@mui/material";

const AppModalActions = ({ children, sx, ...otherProps }) => {
  return (
    <DialogActions
      id="footer-modal"
      sx={{ p: "24px 24px 0 24px", justifyContent: "flex-end", ...sx }}
      {...otherProps}
    >
      {children}
    </DialogActions>
  );
};

export default memo(AppModalActions);
