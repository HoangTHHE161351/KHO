import React, { memo, useCallback, useEffect, useState, useMemo } from "react";
import { SearchIcon } from "src/assets/icons";
import { CommonUtils } from "src/utils";
import { AppConstants } from "src/const";
import AppTextField from "./AppTextField";

const AppSearchDebounce = ({
  onChangeValue,
  valueInput,
  hasEndIcon = true,
  ...otherProps
}) => {
  const [value, setValue] = useState("");

  const debouncedOnChangeValue = useMemo(
    () =>
      CommonUtils.debounce((newValue) => {
        if (onChangeValue instanceof Function) onChangeValue(newValue);
      }, AppConstants.DEBOUNCE_TIME_IN_MILLISECOND),
    [onChangeValue]
  );

  const handleChangeValue = useCallback(
    (event) => {
      const newValue = event.target.value;
      setValue(newValue);

      debouncedOnChangeValue(newValue);
    },
    [debouncedOnChangeValue]
  );

  useEffect(() => {
    setValue(valueInput ?? "");
  }, [valueInput]);

  return (
    <AppTextField
      value={value}
      onChange={handleChangeValue}
      InputProps={{
        endAdornment: hasEndIcon && <SearchIcon sx={{ fontSize: 24 }} />,
      }}
      {...otherProps}
    />
  );
};

export default memo(AppSearchDebounce);
