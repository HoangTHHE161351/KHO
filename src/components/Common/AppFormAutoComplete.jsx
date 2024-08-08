import React, { memo } from "react";
import { InputLabel, Stack, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { AppCheckbox, AppMenuItem } from ".";
import AppAutoCompleteMUI from "./AppAutoCompleteMUI";

const AppFormControlAutocomplete = ({
  label,
  options,
  control,
  name,
  rules,
  isMultiple = false,
  controlProps,
  required = false,
  labelProps,
  actionsButton,
  autocompleteProps,
  onChangeValueForm,
  ...otherProps
}) => {
  return (
    <Stack width="100%" {...otherProps}>
      {label && (
        <InputLabel
          sx={{
            "&": {
              color: "text.primary",
              "& .MuiFormLabel-asterisk": {
                color: "red",
              },
            },
          }}
          required={required}
          {...labelProps}
        >
          {label}
        </InputLabel>
      )}
      <Stack alignItems="center" direction="row">
        <Controller
          control={control}
          name={name}
          rules={{ required, ...rules }}
          render={({ field: { onChange, ...otherFieldProps } }) => {
            let requiredFiled = false;
            if (isMultiple) {
              requiredFiled = required ? !otherFieldProps.value.length : false;
            } else {
              requiredFiled = required;
            }

            return (
              <AppAutoCompleteMUI
                {...otherFieldProps}
                disableCloseOnSelect={isMultiple}
                multiple={isMultiple}
                options={options}
                onChange={(_, data) => {
                  if (onChangeValueForm instanceof Function)
                    onChangeValueForm(data);

                  onChange(data);
                }}
                renderOption={isMultiple ? renderOptionMultiType : renderOption}
                {...autocompleteProps}
                textFieldProps={{
                  ...autocompleteProps?.textFieldProps,
                  required: requiredFiled,
                }}
              />
            );
          }}
          {...controlProps}
        />
        {actionsButton}
      </Stack>
    </Stack>
  );
};

export default memo(AppFormControlAutocomplete);

const renderOption = (props, option) => {
  return (
    <AppMenuItem
      {...props}
      key={option?.id || option?.code || option?.value || option?.label}
    >
      {option?.label}
    </AppMenuItem>
  );
};

const renderOptionMultiType = (props, option, { selected }) => (
  <li {...props}>
    <AppCheckbox style={{ marginRight: 8 }} checked={selected} />
    <Typography>{option.label}</Typography>
  </li>
);
