import React, { memo } from "react";
import { SvgIcon } from "@mui/material";

const CameraIcon = ({ ...props }) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11z"></path>
    </SvgIcon>
  );
};

export default memo(CameraIcon);
