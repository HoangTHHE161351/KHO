import { Collapse, Grid } from "@mui/material";
import React from "react";
import { AppSelectFilter } from "../Common";

const CollapseFilter = ({ isShowFilter }) => {
  return (
    <Collapse in={isShowFilter}>
      <Grid container columnSpacing={2} rowSpacing={2} pt={2}>
        <Grid item xs={2.4}>
          <AppSelectFilter isHasAllOption={true} label="Khối"></AppSelectFilter>
        </Grid>
      </Grid>
    </Collapse>
  );
};

export default CollapseFilter;
