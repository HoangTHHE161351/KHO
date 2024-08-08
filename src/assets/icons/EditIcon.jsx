import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const EditIcon = ({ props }) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M3 10h11v2H3zm0-2h11V6H3zm0 8h7v-2H3zm15.01-3.13.71-.71c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71zm-.71.71-5.3 5.3V21h2.12l5.3-5.3z"></path>
    </SvgIcon>
  );
};

export default memo(EditIcon);
