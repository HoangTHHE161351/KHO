import { forwardRef, memo } from "react";
import { Autocomplete } from "@mui/material";
import { ArrowIcon } from "src/assets/icons";
import { AppTextField } from ".";

const AppAutoCompleteMUI = forwardRef(
  ({ sx, label, textFieldProps, options, ...otherProps }, ref) => {
    const handleCustomIsValue = (option, valueObj) => {
      if (valueObj?.id) {
        return option?.id === valueObj?.id;
      } else if (valueObj?.code) {
        return option?.code === valueObj?.code;
      } else if (valueObj?._id) {
        return option?.name === valueObj?.name;
      } else {
        return option?.label === valueObj?.label;
      }
    };

    return (
      <Autocomplete
        options={options}
        ref={ref}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option.toString();

          if (
            typeof option === "object" &&
            options.find(
              (item) =>
                item.id === option.id ||
                item.code === option.code ||
                item._id === option._id
            )
          ) {
            return option.label || option.name || "";
          }

          return "";
        }}
        isOptionEqualToValue={handleCustomIsValue}
        disablePortal
        fullWidth
        size="small"
        loadingText="Loading..."
        noOptionsText="No data"
        clearText="Clear"
        closeText="Close"
        classes={{
          listbox: "custom-scrollbar",
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            minHeight: 45,
            height: "fit-content !important",
            "& input": {
              height: 40,
            },
          },
          "&.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root.MuiInputBase-sizeSmall":
            {
              paddingRight: "50px",
            },
          "&& .MuiAutocomplete-endAdornment": {
            top: "50%",
            right: 11,
            transform: "translateY(-50%)",
            "& .MuiAutocomplete-clearIndicator svg": {
              fontSize: 14,
            },
          },
          "&+.MuiAutocomplete-popper": {
            "& .MuiAutocomplete-paper": {
              maxHeight: 200,
              minWidth: "fit-content",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 2px 0px",
              "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
                whiteSpace: "nowrap",
                "&.MuiAutocomplete-option[aria-selected='true']": {
                  color: "primary.main",
                  fontWeight: 500,
                },
                "&:hover": {
                  color: "primary.main",
                },
              },
            },
          },
          ...sx,
        }}
        popupIcon={
          <ArrowIcon
            sx={{
              fontSize: 14,
              transform: "rotate(-90deg)",
            }}
          />
        }
        // PopperComponent={CustomPopper}
        renderInput={(params) => (
          <AppTextField {...params} label={label} {...textFieldProps} />
        )}
        {...otherProps}
      />
    );
  }
);

export default memo(AppAutoCompleteMUI);
