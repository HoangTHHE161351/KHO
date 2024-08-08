import { Button, Grid, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import {
  AppMenuItem,
  AppSearchDebounce,
  AppSelectFilter,
  AppToastNotify,
} from "src/components/Common";
import ClassModalEdit from "./ClassModalEdit";
import ImportModal from "./ImportModal";
import ImportStudentClassModal from "./ImportStudentClassModal";
import { AppConstants, EnvConstants } from "src/const";
import useHandleExcel from "src/hooks/useHandleExcel";
import { STATUS_USER } from "src/const/data.const";

const HeaderPageTable = ({
  handleChangeFilterWithKey,
  filter,
  onSuccess,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openImportStudentClass, setOpenImportStudentClass] = useState(false);

  const { handleExportExcel } = useHandleExcel();

  const onExportExcel = async () => {
    try {
      const columns = [
        { name: "No", key: "no", width: 10 },
        { name: "Name", key: "className", width: 30 },
        { name: "Description", key: "description", width: 40 },
        { name: "Status", key: "status", width: 20 },
      ];

      const rows = data?.map((item, index) => ({
        no: index + 1,
        className: item.className || "",
        description: item.description || "",
        status: item.status || "",
      }));

      handleExportExcel({
        columns,
        rows,
        fileName: "Classes.xlsx",
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
    <Grid container columnSpacing={2}>
      <Grid item xs={2.4}>
        <AppSearchDebounce
          onChangeValue={handleChangeFilterWithKey("search")}
          fullWidth
          valueInput={filter?.search}
          inputProps={{
            placeholder: "Search Class",
          }}
        />
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
      <Grid flex={1} container justifyContent="flex-end">
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenImportStudentClass(true)}
          >
            ImportStudentClassExcel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenImport(true)}
          >
            Import Excel
          </Button>
          <Button variant="contained" color="success" onClick={onExportExcel}>
            Export Excel
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create
          </Button>
        </Stack>
      </Grid>
      <ImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        onSuccess={onSuccess}
      />
      <ImportStudentClassModal
        open={openImportStudentClass}
        onClose={() => setOpenImportStudentClass(false)}
        onSuccess={onSuccess}
      />
      <ClassModalEdit
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
    </Grid>
  );
};

export default memo(HeaderPageTable);
