import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const HomeIcon = ({ props }) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
    </SvgIcon>
  );
};

export default memo(HomeIcon);
