import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const MenuIcon = ({ otherProps }) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...otherProps}>
      <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
    </SvgIcon>
  );
};

export default memo(MenuIcon);
