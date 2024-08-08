import { InputLabel, Stack } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AppTextField } from ".";

const AppFormTextField = ({
  label = undefined,
  control,
  name,
  rules = undefined,
  controlProps = undefined,
  required = false,
  labelProps = undefined,
  onChangeValueForm = undefined,
  textfieldProps = undefined,
  ...otherProps
}) => {
  return (
    <Stack {...otherProps}>
      <InputLabel
        sx={{
          color: "text.primary",
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
          <AppTextField
            required={required}
            onChange={(event) => {
              if (onChangeValueForm instanceof Function)
                onChangeValueForm(event);

              onChange(event);
            }}
            sx={{
              backgroundColor: "common.white",
              mt: 0,
              "& .MuiInputBase-root": {
                height: 45,
                "& input": {
                  py: 0,
                  px: 1.25,
                },
              },
            }}
            size="medium"
            fullWidth
            {...otherFieldProps}
            {...textfieldProps}
          />
        )}
      />
    </Stack>
  );
};

export default AppFormTextField;
