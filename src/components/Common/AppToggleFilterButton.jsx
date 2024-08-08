import React, { memo } from "react";
import { Button, Typography } from "@mui/material";
import { FilterIcon } from "src/assets/icons";

const AppToggleFilterButton = ({
  isShowFilter,
  hiddenLabel = "Hidden filter",
  showLabel = "Show filter",
  ...otherProps
}) => {
  return (
    <Button
      startIcon={<FilterIcon sx={{ fontSize: "16px !important" }} />}
      variant="outlined"
      color={isShowFilter ? "success" : "primary"}
      sx={{
        width: "130px",
        justifyContent: "flex-start",
        backgroundColor: "common.white",
      }}
      {...otherProps}
    >
      <Typography whiteSpace={"nowrap"}>
        {isShowFilter ? hiddenLabel : showLabel}
      </Typography>
    </Button>
  );
};

export default memo(AppToggleFilterButton);
