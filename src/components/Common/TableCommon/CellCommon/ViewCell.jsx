import React from "react";
import { AppTableCell } from "..";
import { IconButton } from "@mui/material";
import { OpenEyeIcon } from "src/assets/icons";

const ViewCell = ({ buttonProps, ...otherProps }) => {
  return (
    <AppTableCell align="center" {...otherProps}>
      <IconButton
        sx={{
          color: "text.primary",
          height: 24,
          width: 24,
        }}
        {...buttonProps}
      >
        <OpenEyeIcon />
      </IconButton>
    </AppTableCell>
  );
};

export default ViewCell;
