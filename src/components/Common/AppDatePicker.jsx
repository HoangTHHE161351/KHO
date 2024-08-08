import React, { forwardRef, memo } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AppTextField } from ".";
import "dayjs/locale/vi";

const AppDatePicker = forwardRef((props, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"vi"}>
      <DatePicker
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

export default memo(AppDatePicker);
