import dayjs from "dayjs";
import React from "react";
import { AppConstants } from "src/const";
import { AppTableCell } from "..";

const DateCell = ({
  date,
  dateFormat = AppConstants.DATE_FORMAT,
  ...otherProps
}) => {
  const timeDayjs = dayjs(date);
  const isValid = timeDayjs.isValid();

  return (
    <AppTableCell align="center" {...otherProps}>
      {isValid && timeDayjs.format(dateFormat)}
    </AppTableCell>
  );
};

export default DateCell;
