import React, { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";

const RowTable = ({ userData, index }) => {
  return (
    <AppTableRow key={userData.id}>
      <AppTableCell align="center">{index + 1}</AppTableCell>
      <AppTableCell align="left">{userData.fullName}</AppTableCell>
      <AppTableCell align="left">
        <img
          src={`${userData?.faceImage}`}
          alt={userData?.fullName}
          // style={{ width: "100%", borderRadius: "8px", alignContent: "center" }}
        />
      </AppTableCell>
      <AppTableCell align="left">{userData.cameraIp}</AppTableCell>
      <AppTableCell align="left">{userData.roomName}</AppTableCell>
      <AppTableCell align="center">{userData.time}</AppTableCell>

      <AppTableCell align="center">{userData.type}</AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
