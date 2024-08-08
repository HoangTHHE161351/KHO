import { Button, Grid, Stack } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { AppMenuItem, AppSearchDebounce, AppSelectFilter } from "../Common";
import { GENDER_LIST, STATUS_USER } from "src/const/data.const";
import ImportTeacherSubjectModal from "./ImportTeacherSubjectModal";
import AppAutoCompleteMUI from "../Common/AppAutoCompleteMUI";

const FilterTable = ({ changeFilterWithKey, filter }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid item xs={2.4}>
          <AppSearchDebounce
            onChangeValue={changeFilterWithKey("search")}
            placeholder="Search"
            valueInput={filter.search}
          />
        </Grid>
        <Grid item xs={2.4}>
          <AppAutoCompleteMUI
            value={filter?.status}
            labelId="statusFilter"
            onChangeValue={changeFilterWithKey("status")}
            isHasAllOption={true}
            label="Status"
          >
            {STATUS_USER?.map((item) => (
              <AppMenuItem value={item.id} key={item.id}>
                {item.label}
              </AppMenuItem>
            ))}
          </AppAutoCompleteMUI>
        </Grid>
        <Grid item xs={2.4}>
          <AppAutoCompleteMUI
            value={filter?.gender}
            labelId="genderFilter"
            onChangeValue={changeFilterWithKey("gender")}
            isHasAllOption={true}
            label="Gender"
          >
            {GENDER_LIST?.map((item) => (
              <AppMenuItem value={item.id} key={item.id}>
                {item.label}
              </AppMenuItem>
            ))}
          </AppAutoCompleteMUI>
        </Grid>
        <Grid item container flex={1} justifyContent={"flex-end"}>
          <Stack direction={"row"} spacing={1}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => setOpen(true)}
            >
              Import Teacher Subject Excel
            </Button>
          </Stack>
        </Grid>
        <ImportTeacherSubjectModal open={open} onClose={() => setOpen(false)} />
      </Grid>
    </>
  );
};

export default FilterTable;
