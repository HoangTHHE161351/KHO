import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AppConstants } from "src/const";

const AppFormSelect = ({
  label = undefined,
  control,
  name,
  list = [],
  isHasAllOption = false,
  rules = undefined,
  controlProps = undefined,
  required = false,
  labelProps = undefined,
  onChangeValueForm = undefined,
  selectProps = undefined,
  ...otherProps
}) => {
  return (
    <Stack {...otherProps}>
      <InputLabel
        sx={{
          "& .MuiFormLabel-asterisk": {
            color: "red",
          },
        }}
        required={required}
        {...labelProps}
      >
        {label}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        rules={{ required, ...rules }}
        {...controlProps}
        render={({ field: { onChange, ...otherFieldProps } }) => (
          <Select
            required={required}
            onChange={(event, child) => {
              if (onChangeValueForm instanceof Function)
                onChangeValueForm(event);

              onChange(event, child);
            }}
            sx={{
              backgroundColor: "common.white",
              height: 45,
              borderRadius: "8px",
            }}
            {...selectProps}
            {...otherFieldProps}
          >
            {isHasAllOption && (
              <MenuItem
                value={AppConstants.ALL_OPTIONS.value}
                key={AppConstants.ALL_OPTIONS.value}
              >
                {AppConstants.ALL_OPTIONS.label}
              </MenuItem>
            )}
            {list.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Stack>
  );
};

export default AppFormSelect;
