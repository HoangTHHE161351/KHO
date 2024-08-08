import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LoginHardDiskPanel,
  TableDevicePanel,
  TableHardDiskPanel,
} from "src/components/sn-manage-device";

const DeviceManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(`1`);

  useEffect(() => {
    if (searchParams.get("tab")) {
      setValue(searchParams.get("tab"));
    }
  }, [searchParams]);

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="lab API tabs example"
        >
          <Tab label="Devices" value="1" />
          <Tab label="Hard Disk" value="2" />
          <Tab label="Login Device" value="3" />
        </TabList>
      </Box>
      <TabPanel
        value="1"
        sx={{
          pb: 0,
        }}
      >
        <TableDevicePanel />
      </TabPanel>
      <TabPanel
        value="2"
        sx={{
          pb: 0,
        }}
      >
        <TableHardDiskPanel />
      </TabPanel>
      <TabPanel
        value="3"
        sx={{
          pb: 0,
        }}
      >
        <LoginHardDiskPanel />
      </TabPanel>
    </TabContext>
  );
};

export default DeviceManager;
