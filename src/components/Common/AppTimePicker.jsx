import React, { forwardRef, memo } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AppTextField } from ".";
import "dayjs/locale/vi";
import { TimePicker } from "@mui/x-date-pickers";

const AppTimePicker = forwardRef((props, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"vi"}>
      <TimePicker
        inputRef={ref}
        slots={{
          textField: AppTextField,
        }}
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
});

export default memo(AppTimePicker);
