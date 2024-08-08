import { Button } from "@mui/material";
import React, { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
  EditCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ data, order, onEdit, onDelete }) => {
  return (
    <>
      <AppTableRow>
        <AppTableCell align="center">{order}</AppTableCell>
        <AppTableCell>{data.roomName}</AppTableCell>
        <AppTableCell>{data.description}</AppTableCell>
        <EditCell
          buttonProps={{
            onClick: onEdit,
          }}
        />
        <DeleteCell
          buttonProps={{
            onClick: onDelete,
          }}
        />
        <AppTableCell
          align="center"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          {data.status}
        </AppTableCell>
        <AppTableCell
          align="center"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <Button>View</Button>
          {/* tryền paramester để nhay sang trang historylog của room */}
        </AppTableCell>
      </AppTableRow>
    </>
  );
};

export default memo(RowTable);
