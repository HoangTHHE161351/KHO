/* eslint-disable no-restricted-globals */
import { Typography } from "@mui/material";
import React, { memo, useState } from "react";
import {
  AppTableCell,
  AppTableRow,
  DeleteCell,
  EditCell,
} from "src/components/Common/TableCommon";
import Button from "@mui/material/Button";
import { getCameraAccess } from "src/services/Device.service";

const RowTable = ({ row, order, onEdit, onDelete }) => {
  const handleOpenWindow = (url, user, psw) => {
    let left = (screen.width - 900) / 2;
    let top = (screen.height - 600) / 4;

    let newWindow = window.open(
      url,
      "popUpWindow",
      `resizable=yes, width=900, height=600, top=${top}, left=${left}`
    );

    if (newWindow) {
      newWindow.onload = () => {
        // Make sure to handle null and type assertions
        const loginUser = newWindow?.document.getElementById("login_user");
        const loginPassword = newWindow?.document.getElementById("login_psw");
        if (loginUser && loginPassword) {
          // Fill the form field
          loginUser.value = user;
          loginPassword.value = psw;
        }
      };
    } else {
      console.error("Failed to open new window.");
    }
  };

  const [cameraAccess, setCameraAccess] = useState([]);
  const handleSendEmail = async () => {
    try {
      const params = { cameraId: row?.id }; // Assuming row is defined elsewhere
      console.log("++++++", params.cameraId);
      const response = await getCameraAccess(params); // Making the API call
      console.log("Response:", response); // Check response structure
      const data = response?.payload?.data; // Extracting data from response
      console.log("Data:", data); // Check fetched data

      if (data) {
        // Update cameraAccess state with the fetched data
        setCameraAccess(data);
      }
    } catch (error) {
      console.log("Error fetching camera access:", error);
      // Handle error state if needed
    }
  };

  console.log("++++++++++++++", cameraAccess);
  return (
    <AppTableRow>
      <AppTableCell align="center">{order}</AppTableCell>
      <EditCell buttonProps={{ onClick: onEdit }} />
      <DeleteCell buttonProps={{ onClick: onDelete }} />
      <AppTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
        {row?.port}
      </AppTableCell>
      <AppTableCell align="left">
        <Typography
          onClick={() =>
            handleOpenWindow(`https:${row.ip}`, "admin", "o858899789")
          }
          sx={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
            whiteSpace: "nowrap",
          }}
        >
          {row?.ip}
        </Typography>
      </AppTableCell>
      <AppTableCell align="left">{row?.roomName}</AppTableCell>
      <AppTableCell align="left">{row?.cameraType}</AppTableCell>
      <AppTableCell align="left">{row?.checkType}</AppTableCell>
      <AppTableCell align="center" sx={{ whiteSpace: "nowrap" }}>
        {row?.status}
      </AppTableCell>
      <AppTableCell align="center">
        <Button variant="contained" onClick={handleSendEmail}>
          View Account
        </Button>
      </AppTableCell>
    </AppTableRow>
  );
};

export default memo(RowTable);
