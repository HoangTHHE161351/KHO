import { forwardRef, memo } from "react";
import { Select } from "@mui/material";
import { ArrowIcon } from "src/assets/icons";

const AppSelect = forwardRef(({ sx, ...otherProps }, ref) => {
  return (
    <Select
      sx={{
        backgroundColor: "common.white",
        height: 40,
        borderRadius: "4px",

        "&.Mui-focused,&.Mui-focused .MuiSvgIcon-root": {
          color: "primary.main",
        },
        "& .MuiSvgIcon-root": {
          right: 11,
          width: 16,
          height: 16,
          transform: "rotate(-90deg)",
        },
        "& .MuiSvgIcon-root.MuiSelect-iconOpen": {
          transform: "rotate(90deg)",
        },
        "&.MuiInputBase-root.Mui-disabled": {
          backgroundColor: "grey.A100",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(226, 232, 240)",
          },
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "rgb(226, 232, 240)",
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.main",
          borderWidth: 2,
        },
        ...sx,
      }}
      IconComponent={ArrowIcon}
      {...otherProps}
      ref={ref}
    />
  );
});
export default memo(AppSelect);
