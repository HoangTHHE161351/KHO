import { InputLabel, Stack } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AppTextField } from ".";
import AppTimePicker from "./AppTimePicker";

const AppFormTimePicker = ({
  label = undefined,
  control,
  name,
  rules = undefined,
  controlProps = undefined,
  required = false,
  labelProps = undefined,
  timePickerProps = undefined,
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
        render={({ field }) => (
          <AppTimePicker
            {...field}
            slots={{
              textField: AppTextField,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  maxHeight: "45px",
                },
              },
            }}
            {...timePickerProps}
          />
        )}
      />
    </Stack>
  );
};

export default AppFormTimePicker;
