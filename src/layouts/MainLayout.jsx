import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import SideBar from "src/components/sn-layout/SideBar";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack>
        <SideBar open={open} setOpen={setOpen} />
        <Box
          pt={"80px"}
          paddingLeft={open ? " 248px" : "64px"}
          sx={{
            transition: "padding-left 0.2s linear",
            overflow: "hidden",
          }}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
