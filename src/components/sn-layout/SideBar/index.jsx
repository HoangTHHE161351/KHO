import { Box, Divider, Stack, Typography, styled } from "@mui/material";
import React, { memo } from "react";
import MuiDrawer from "@mui/material/Drawer";
import TopBar from "./TopBar";
import SideBarMenu from "./SideBarMenu";

const SideBar = ({ open, setOpen }) => {
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <Stack
          height={"60px"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography fontSize={24}>Logo</Typography>
        </Stack>
        <Divider />
        <SideBarMenu open={open} />
      </Drawer>
      <Box
        sx={{
          transition: "all 0.2s linear",
          width: "100%",
          paddingLeft: `${open ? " 248px" : "50px"}`,
          height: "auto",
          position: "fixed",
          top: 0,
          zIndex: 1000,
          right: 0,
        }}
      >
        <TopBar open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

const openedMixin = (theme) => ({
  width: 248,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 248,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default memo(SideBar);
