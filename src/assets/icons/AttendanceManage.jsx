import React, { memo } from "react";
import { SvgIcon } from "@mui/material";

const ArrowIcon = ({ ...props }) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M22 24H2v-4h20zM13.06 5.19l3.75 3.75L7.75 18H4v-3.75zm4.82 2.68-3.75-3.75 1.83-1.83c.39-.39 1.02-.39 1.41 0l2.34 2.34c.39.39.39 1.02 0 1.41z"></path>
    </SvgIcon>
  );
};

export default memo(ArrowIcon);
