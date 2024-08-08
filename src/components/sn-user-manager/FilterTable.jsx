import React, { useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import {
  AppMenuItem,
  AppSearchDebounce,
  AppSelectFilter,
  AppToastNotify,
} from "../Common";
import UserManageAddModal from "./UserManagerAddModal";
import { useLocation } from "react-router-dom";
import { AppConstants, EnvConstants, PathConstants } from "src/const";
import useHandleExcel from "src/hooks/useHandleExcel";
import ImportExcelModal from "./ImportExcelModal";
import { ROLE_LIST, STATUS_USER } from "src/const/data.const";

const FilterTable = ({
  handleChangeFilterWithKey,
  filter,
  onSuccess,
  dataExport = [],
}) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const { handleExportExcel } = useHandleExcel();

  const onExportExcel = async () => {
    try {
      const columns = [
        { name: "No", key: "no", width: 10 },
        { name: "Username", key: "username", width: 20 },
        { name: "Fullname", key: "fullname", width: 20 },
        { name: "Email", key: "email", width: 20 },
        { name: "Phone", key: "phone", width: 20 },
        { name: "Role", key: "role", width: 20 },
      ];

      const rows = dataExport?.map((item, index) => ({
        no: index,
        username: item.username,
        fullname: item.lastName + " " + item.firstName,
        email: item.email,
        phone: item.phone,
        role: item.roleName,
      }));

      handleExportExcel({
        columns,
        rows,
        fileName: "UserList.xlsx",
      });
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    }
  };

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
        <Grid item xs={2.4}>
          <AppSelectFilter
            value={filter?.roleName}
            labelId="roleName"
            onChangeValue={handleChangeFilterWithKey("roleName")}
            isHasAllOption={true}
            label="Role"
          >
            {ROLE_LIST?.map((item) => (
              <AppMenuItem value={item.id} key={item.id}>
                {item.label}
              </AppMenuItem>
            ))}
          </AppSelectFilter>
        </Grid>
        <Grid item xs={2.4}>
          <AppSelectFilter
            value={filter?.status}
            labelId="statusFilter"
            onChangeValue={handleChangeFilterWithKey("status")}
            isHasAllOption={true}
            label="Status"
          >
            {STATUS_USER?.map((item) => (
              <AppMenuItem value={item.id} key={item.id}>
                {item.label}
              </AppMenuItem>
            ))}
          </AppSelectFilter>
        </Grid>
        {pathname === PathConstants.USER_MANAGER && (
          <Grid item container flex={1} justifyContent={"flex-end"}>
            <Stack direction={"row"} spacing={1} alignItems={"flex-start"}>
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenImport(true)}
              >
                Import Excel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={onExportExcel}
              >
                Export Excel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpen(true)}
              >
                Create
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
      <ImportExcelModal
        open={openImport}
        onClose={() => setOpenImport(false)}
      />
      <UserManageAddModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default FilterTable;
