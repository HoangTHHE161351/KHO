import { InputLabel, Stack } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AppDatePicker, AppTextField } from ".";
import dayjs from "dayjs";

const AppFormDatePicker = ({
  label = undefined,
  control,
  name,
  rules = undefined,
  controlProps = undefined,
  required = false,
  labelProps = undefined,
  datePickerProps = undefined,
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
          <AppDatePicker
            {...field}
            maxDate={dayjs()}
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
            {...datePickerProps}
          />
        )}
      />
    </Stack>
  );
};

export default AppFormDatePicker;
