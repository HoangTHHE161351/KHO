import React, { memo } from "react";
import { FormControl, InputLabel } from "@mui/material";
import { AppMenuItem, AppSelect } from "..";
import { AppConstants } from "src/const";

const AppSelectFilter = ({
  children,
  labelId,
  value,
  label,
  isHasAllOption = false,
  onChangeValue,
  selectId,
  selectProps,
  ...otherProps
}) => {
  const handleChangeValue = (event) => {
    const newValue = event.target.value;
    onChangeValue(newValue);
  };

  return (
    <FormControl size="small" fullWidth {...otherProps}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <AppSelect
        labelId={labelId}
        label={label}
        id={selectId}
        fullWidth
        onChange={handleChangeValue}
        value={value}
        {...selectProps}
      >
        {isHasAllOption && (
          <AppMenuItem
            value={AppConstants.ALL_OPTIONS.value}
            key={AppConstants.ALL_OPTIONS.value}
          >
            {AppConstants.ALL_OPTIONS.label}
          </AppMenuItem>
        )}
        {children}
      </AppSelect>
    </FormControl>
  );
};

export default memo(AppSelectFilter);
