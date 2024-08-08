import { Button, Grid, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import {
  AppMenuItem,
  AppSearchDebounce,
  AppSelectFilter,
  AppToastNotify,
} from "src/components/Common";
import SubjectModalEdit from "./SubjectModalEdit";
import ImportModal from "./ImportModal";
import ImportSubjectClassModal from "./ImportSubjectClassModal";
import { AppConstants, EnvConstants } from "src/const";
import useHandleExcel from "src/hooks/useHandleExcel";
import { STATUS_USER } from "src/const/data.const";

const HeaderPageTable = ({
  handleChangeFilterWithKey,
  //handleChangeSearchKey,
  filter,
  onSuccess,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openImportSubjectClass, setOpenImportSubjectClass] = useState(false);

  const { handleExportExcel } = useHandleExcel();

  const onExportExcel = async () => {
    try {
      const columns = [
        { name: "No", key: "no", width: 10 },
        { name: "Code", key: "code", width: 20 },
        { name: "Name", key: "name", width: 35 },
        { name: "Slots", key: "slots", width: 20 },
        { name: "Status", key: "status", width: 20 },
      ];

      const rows = data?.map((item, index) => ({
        no: index + 1,
        code: item.code,
        name: item.name,
        slots: item.slots,
        status: item.status,
      }));

      handleExportExcel({
        columns,
        rows,
        fileName: "Subjects.xlsx",
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
          valueInput={filter?.search || ""}
          inputProps={{
            placeholder: "Search Subject",
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
            onClick={() => setOpenImportSubjectClass(true)}
          >
            Import Subject Class Excel
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
      <SubjectModalEdit
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
      <ImportSubjectClassModal
        open={openImportSubjectClass}
        onClose={() => setOpenImportSubjectClass(false)}
        onSuccess={onSuccess}
      />
      <ImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        onSuccess={onSuccess}
      />
    </Grid>
  );
};

export default memo(HeaderPageTable);
