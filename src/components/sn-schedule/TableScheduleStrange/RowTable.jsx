import { Box } from "@mui/material";
import React, { memo } from "react";
import { AppTableCell, AppTableRow } from "src/components/Common/TableCommon";
import AvatarDefault from "src/assets/images/user-default.png";

const RowTable = ({ data, order }) => {
  return (
    <AppTableRow>
      <AppTableCell align={"center"}>{order}</AppTableCell>
      <AppTableCell align={"left"}>{data?.fullName}</AppTableCell>
      <AppTableCell align={"center"}>
        <Box width={"150px"} height={"200px"} mx={"auto"}>
          <img
            src={data?.faceImage || AvatarDefault}
            alt="avatar"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "fill",
            }}
          />
        </Box>
      </AppTableCell>
      <AppTableCell align={"left"}>{data?.cameraIp}</AppTableCell>
      <AppTableCell align={"left"}>{data?.roomName}</AppTableCell>
      <AppTableCell align={"left"}>{data?.time}</AppTableCell>
      <AppTableCell
        align={"left"}
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {data?.type}
      </AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
