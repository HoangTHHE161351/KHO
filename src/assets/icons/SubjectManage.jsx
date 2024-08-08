import React, { memo } from "react";
import { SvgIcon } from "@mui/material";

const SubjectManageIcon = ({ ...props }) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M14 17H4v2h10zm6-8H4v2h16zM4 15h16v-2H4zM4 5v2h16V5z"></path>
    </SvgIcon>
  );
};

export default memo(SubjectManageIcon);
