import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  ViewCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ data, order, onViewDetail }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>
      <ViewCell
        buttonProps={{
          onClick: onViewDetail,
        }}
      />
      <AppTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
        {data.fullname}
      </AppTableCell>

      <AppTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
        {data.email}
      </AppTableCell>
      <AppTableCell align="left">{data.dob}</AppTableCell>
      <AppTableCell align="left">{data.phone}</AppTableCell>
      <AppTableCell
        align="center"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data.status}
      </AppTableCell>
      <AppTableCell />
    </AppTableRow>
  );
};

export default memo(RowTable);
