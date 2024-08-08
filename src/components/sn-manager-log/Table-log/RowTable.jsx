import React, { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";
import { Button } from "@mui/material";

const RowTable = ({ index, userData, handleSelectUser}) => {
  return (
    <AppTableRow>
      <AppTableCell align="center">{index + 1}</AppTableCell>
      <AppTableCell align="left">{userData.roomName}</AppTableCell>
      <AppTableCell align="left">{userData.userName}</AppTableCell>
      <AppTableCell align="left">{userData.name}</AppTableCell>
      <AppTableCell align="left">{userData.checkIn}</AppTableCell>
      <AppTableCell align="left">{userData.checkOut}</AppTableCell>
      <AppTableCell align="left">{userData.note}</AppTableCell>
      <AppTableCell
        align="center"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <Button onClick={() => handleSelectUser(userData)}>View</Button>
      </AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
