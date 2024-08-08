import React, { memo } from "react";
import { InputLabel, Stack } from "@mui/material";
import { Controller } from "react-hook-form";
import { AppToggle } from ".";

const AppFormControlToggle = ({
  label,
  control,
  name,
  rules,
  controlProps,
  required = false,
  labelProps,
  toggleProps,
  onChangeValueForm,
  ...otherProps
}) => {
  return (
    <Stack
      direction="row-reverse"
      alignItems="center"
      justifyContent="flex-end"
      spacing={2}
      {...otherProps}
    >
      {label && (
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
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required, ...rules }}
        render={({ field: { onChange, ...otherFieldProps } }) => (
          <AppToggle
            onChange={(event, checked) => {
              if (onChangeValueForm instanceof Function)
                onChangeValueForm(event, checked);
              onChange(event);
            }}
            {...otherFieldProps}
            checked={otherFieldProps.value}
            {...toggleProps}
          />
        )}
        {...controlProps}
      />
    </Stack>
  );
};

export default memo(AppFormControlToggle);
