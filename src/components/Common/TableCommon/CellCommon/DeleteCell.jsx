import React from "react";
import { AppTableCell } from "..";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { DeleteIcon } from "src/assets/icons";

const DeleteCell = ({ buttonProps, href, ...otherProps }) => {
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
        <DeleteIcon />
      </IconButton>
    </AppTableCell>
  );
};

export default DeleteCell;
