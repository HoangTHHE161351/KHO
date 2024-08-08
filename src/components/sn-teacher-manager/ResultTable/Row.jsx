import React, { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";
import { DataConstants } from "src/const";

const Row = ({ data, order, ...otherProps }) => {
  const isError = data.validateResult === DataConstants.BOOLEAN_TYPE.false;

  return (
    <AppTableRow
      tabIndex={-1}
      sx={{
        "&& .MuiTableCell-root": {
          color: isError ? "error.main" : "inherit",
        },
      }}
      {...otherProps}
    >
      <AppTableCell align="center">{order}</AppTableCell>
      <AppTableCell>{data?.teacherCode}</AppTableCell>
      <AppTableCell>{data?.subjectCode}</AppTableCell>
      <AppTableCell
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data?.status}
      </AppTableCell>
      <AppTableCell>{data?.errorMess}</AppTableCell>
      <AppTableCell></AppTableCell>
    </AppTableRow>
  );
};

export default memo(Row);
