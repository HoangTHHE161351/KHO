import React, { forwardRef, memo } from "react";
import { Switch } from "@mui/material";

const AppToggle = forwardRef(({ sx, ...otherProps }, ref) => {
  return (
    <Switch
      ref={ref}
      sx={{
        width: 30,
        height: 16,
        padding: 0,
        "& .MuiSwitch-switchBase": {
          height: "100%",
          width: "16px",
          color: "common.white",
          padding: "2px",
        },
        "& .MuiSwitch-track": {
          borderRadius: "13.3px",
          height: "100%",
          backgroundColor: "text.secondary",
          opacity: 1,
        },
        "& .MuiSwitch-thumb": {
          width: 12,
          height: 12,
        },
        "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
          color: "common.white",
          transform: "translateX(13.66px)",

          "&+.MuiSwitch-track": {
            opacity: 1,
          },
        },
        ...sx,
      }}
      {...otherProps}
    />
  );
});

export default memo(AppToggle);
