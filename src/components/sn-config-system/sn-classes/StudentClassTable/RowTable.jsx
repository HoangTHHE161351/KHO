import { Box } from "@mui/material";
import { memo } from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
} from "src/components/Common/TableCommon";

const RowTable = ({ order, row, onDelete }) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>

      <AppTableCell align="center">
        <Box
          height={120}
          width={"unset"}
          sx={{
            aspectRatio: 12 / 16,
            mx: "auto",
          }}
        >
          <img
            src={row?.image}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </AppTableCell>
      <AppTableCell>{row?.fullName}</AppTableCell>
      <AppTableCell>{row?.username}</AppTableCell>
      <AppTableCell>{row?.email}</AppTableCell>
      <DeleteCell
        buttonProps={{
          onClick: onDelete,
        }}
      />
    </AppTableRow>
  );
};

export default memo(RowTable);
