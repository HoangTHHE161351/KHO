import { Box } from "@mui/material";
import React from "react";
import { ImportExcelModal } from "src/components/sn-manage-student";

const ImportUser = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box bgcolor={"common.white"}>
      <ImportExcelModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default ImportUser;
