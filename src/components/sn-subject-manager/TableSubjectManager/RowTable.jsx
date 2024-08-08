import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  EditCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ data, index, onOpenEdit }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{index}</AppTableCell>
      <EditCell buttonProps={{ onClick: onOpenEdit }} />
      <AppTableCell align="left">{data.name}</AppTableCell>
      <AppTableCell
        align="left"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data.code}
      </AppTableCell>
      <AppTableCell align="right">{data.slots}</AppTableCell>
      <AppTableCell
        align={"center"}
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data.status}
      </AppTableCell>
      {/* <StatusCell
        onStatusChange={(_, value) => {
          handleChangeStatus({
            id: data.id,
            status: value
              ? DataConstants.STATUS_TYPE.ACTIVE
              : DataConstants.STATUS_TYPE.INACTIVE,
            onSuccess: () => {
              dispatch(
                subjectActions.getSubjectList(DataConstants.PAGINATION_DEFAULT)
              );
            },
          });
        }}
        status={data.status}
      /> */}
      <AppTableCell />
    </AppTableRow>
  );
};

export default memo(RowTable);
