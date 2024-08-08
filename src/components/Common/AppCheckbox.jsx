import React, { forwardRef, memo } from "react";
import { Checkbox } from "@mui/material";

const AppCheckbox = forwardRef(({ sx, ...otherProps }, ref) => {
  return (
    <Checkbox
      sx={{
        backgroundColor: "common.white",
        width: 20,
        height: 20,
        borderRadius: "4px",
        "&& .MuiSvgIcon-root": {
          cursor: "default",
        },
        "&:hover": {
          backgroundColor: "common.white",
        },
        ...sx,
      }}
      inputRef={ref}
      {...otherProps}
    />
  );
});
export default memo(AppCheckbox);
