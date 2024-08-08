import { memo, useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import AppTextField from "../AppTextField";
import { ArrowIcon } from "components/icons";

const AppAutoComplete = ({
  sx,
  label,
  valueSelect,
  options,
  onChangeValue,
  required = false,
  error,
  disableClearable = false,
  ...otherProps
}) => {
  const [valueComplete, setValueComplete] = useState(null);

  const handleChangeValue = (event, data, reason) => {
    setValueComplete(data);
    onChangeValue(data?.value);
  };

  const handleCustomIsValue = (option, valueObj) => {
    return option?.value === valueObj?.value;
  };

  useEffect(() => {
    if (valueSelect === undefined || valueSelect === null) {
      setValueComplete(null);
    } else if (options && Array.isArray(options)) {
      const newValue = options.find((item) => item.value === valueSelect);
      newValue && setValueComplete(newValue);
    }
  }, [valueSelect, options]);

  return (
    <Autocomplete
      options={options}
      value={valueComplete}
      onChange={handleChangeValue}
      isOptionEqualToValue={handleCustomIsValue}
      disablePortal
      fullWidth
      disableClearable={disableClearable}
      size="small"
      loadingText="Loading..."
      noOptionsText="No data"
      clearText="Delete"
      closeText="Close"
      classes={{
        listbox: "custom-scrollbar",
      }}
      sx={{
        backgroundColor: "common.black",
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
        "&.MuiAutocomplete-popper": {
          "& .MuiAutocomplete-paper": {
            minWidth: "fit-content",
            "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
              border: "1px solid",
              whiteSpace: "nowrap",
              "&.MuiAutocomplete-option[aria-selected='true']": {
                color: "primary.main",
                fontWeight: 500,
              },
              "&:hover": {
                color: "primary.main",
                backgroundColor: "common.white",
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
      renderInput={(params) => (
        <AppTextField
          {...params}
          label={label}
          required={required}
          error={!!error}
          helperText={error && error.message}
        />
      )}
      {...otherProps}
    />
  );
};

export default memo(AppAutoComplete);
