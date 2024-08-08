import React from "react";
import { AppTableCell } from "..";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { EditIcon } from "src/assets/icons";

const EditCell = ({ buttonProps, href, ...otherProps }) => {
  return (
    <AppTableCell align="center" {...otherProps}>
      <IconButton
        LinkComponent={Link}
        sx={{
          color: "text.primary",
          height: 24,
          width: 24,
        }}
        to={href}
        {...buttonProps}
      >
        <EditIcon />
      </IconButton>
    </AppTableCell>
  );
};

export default EditCell;
