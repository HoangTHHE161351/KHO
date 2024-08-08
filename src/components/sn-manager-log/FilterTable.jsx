import React, { useCallback, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { AppSearchDebounce, AppToggleFilterButton } from "../Common";
import { ClearFilterIcon } from "src/assets/icons";
import CollapseFilter from "./CollapseFilter";
// import UserManageAddModal from "./UserManagerAddModal";
// import useExportExcel from "./hooks/useExportExcel";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PathConstants } from "src/const";
import { teacherActions } from "src/redux-store/store";

const FilterTable = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [open, setOpen] = useState(false);

  const { filter } = useSelector((state) => state.teacherReducer);

  const handleChangeFilterWithKey = useCallback(
    (key) => (value) => {
      dispatch(
        teacherActions.changeFilterWithKey({
          key,
          value,
        })
      );
    },
    [dispatch]
  );

  // const { handleExportExcel } = useExportExcel();

  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid item xs={2.4}>
          <AppSearchDebounce
            onChangeValue={handleChangeFilterWithKey("search")}
            placeholder="Search"
            valueInput={filter.search}
          />
        </Grid>
        <Grid item container flexWrap="nowrap" xs={2.4}>
          <AppToggleFilterButton
            isShowFilter={isShowFilter}
            onClick={() => setIsShowFilter(!isShowFilter)}
          />
          <Tooltip
            arrow
            title={<Typography variant="body2">Remove Filter</Typography>}
          >
            <IconButton onClick={() => {}}>
              <ClearFilterIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        {pathname === PathConstants.USER_MANAGER && (
          <Grid item container flex={1} justifyContent={"flex-end"}>
            <Stack direction={"row"} spacing={1}>
              {/* <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleExportExcel(filter, "user_export")}
              >
                Export Excel
              </Button> */}
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => setOpen(true)}
              >
                Create
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
      <CollapseFilter isShowFilter={isShowFilter} />
      {/* <UserManageAddModal open={open} onClose={() => setOpen(false)} /> */}
    </>
  );
};

export default FilterTable;
