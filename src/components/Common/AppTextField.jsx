import { forwardRef, memo } from "react";
import { TextField } from "@mui/material";

const AppTextField = forwardRef(
  ({ sx, type, inputProps, ...otherProps }, ref) => {
    return (
      <TextField
        sx={{
          color: "common.black",
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(226, 232, 240)",
            boxShadow:
              "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
          },
          ".MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "error.main",
            },
          "& .MuiInputBase-root": {
            backgroundColor: "common.white",
            borderRadius: "4px",
            minHeight: 45,
            maxHeight: 45,
            "&.Mui-disabled": {
              backgroundColor: "#f3f4f6",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(226, 232, 240)",
              },
            },
          },
          input: {
            height: 45,
            padding: "0 0 0 8px",
            boxShadow: "0 0 0 1000px white inset !important",
            "&.Mui-disabled": {
              boxShadow: "0 0 0 1000px #f3f4f6 inset !important",
            },
          },
          ...sx,
        }}
        size="small"
        fullWidth
        inputRef={ref}
        onKeyDown={type === "number" ? handleKeyDown : undefined}
        type={type}
        inputProps={{
          onInvalid: (e) => {
            const target = e.target;

            if (target.validity.valid) {
              target.setCustomValidity("Vui lòng điền vào trường này.");
            }
          },
          ...inputProps,
        }}
        {...otherProps}
      />
    );
  }
);
export default memo(AppTextField);

const exceptThisSymbols = ["e", "E", "ê", "Ê", "+", "-", ".", "_"];
const handleKeyDown = (e) => {
  exceptThisSymbols.includes(e.key) && e.preventDefault();
};
