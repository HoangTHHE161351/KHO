import { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";

const RowTable = ({ data, order }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>
      <AppTableCell>{data?.slotName}</AppTableCell>
      <AppTableCell>{data?.startTime}</AppTableCell>
      <AppTableCell>{data?.endTime}</AppTableCell>
      <AppTableCell>{data.description}</AppTableCell>
      <AppTableCell
        align="center"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data.statusAdd}
      </AppTableCell>
      <AppTableCell>{data.errorMess}</AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
