import { SvgIcon } from "@mui/material";
import { memo } from "react";

const PlusIcon = ({ sx, ...otherProps }) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        fontSize: "inherit",
        ...sx,
      }}
      {...otherProps}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </SvgIcon>
  );
};
export default memo(PlusIcon);
