import React, { memo, useMemo } from "react";
import { AppTableCell } from "..";
import { AppToggle } from "src/components/Common";
import { DataConstants } from "src/const";

const StatusCell = ({ status, onStatusChange, toggleProps, ...otherProps }) => {
  const isActive = useMemo(
    () => status === DataConstants.STATUS_TYPE.ACTIVE,
    [status]
  );
  return (
    <AppTableCell align="center" {...otherProps}>
      <AppToggle
        onChange={onStatusChange}
        checked={isActive}
        {...toggleProps}
      />
    </AppTableCell>
  );
};

export default memo(StatusCell);
