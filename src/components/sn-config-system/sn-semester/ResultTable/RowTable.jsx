import dayjs from "dayjs";
import { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";
import { AppConstants } from "src/const";

const RowTable = ({ data, order }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>
      <AppTableCell>{data.semesterName}</AppTableCell>
      <AppTableCell>
        {dayjs(data.startTime).format(AppConstants.DATE_FORMAT)}
      </AppTableCell>
      <AppTableCell>
        {dayjs(data.endTime).format(AppConstants.DATE_FORMAT)}
      </AppTableCell>
      <AppTableCell>{data.description}</AppTableCell>
      <AppTableCell
        align="center"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data.status}
      </AppTableCell>
      <AppTableCell>{data.errorMess}</AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
