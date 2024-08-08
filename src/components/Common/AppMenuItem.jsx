import React, { memo } from "react";
import { MenuItem } from "@mui/material";

const AppMenuItem = ({ sx, ...otherProps }) => {
  return (
    <MenuItem
      sx={{
        "&.Mui-selected": {
          color: "primary.main",
          fontWeight: 500,
        },
        "&:hover": {
          color: "primary.main",
          backgroundColor: "transparent",
        },
        ...sx,
      }}
      {...otherProps}
    />
  );
};

export default memo(AppMenuItem);
