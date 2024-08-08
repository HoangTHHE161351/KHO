import { Button, Grid, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import AddSemesterModal from "./AddSemesterModal";
import ImportModal from "./ImportModal";
import {
  AppMenuItem,
  AppSearchDebounce,
  AppSelectFilter,
  AppToastNotify,
} from "src/components/Common";
import useHandleExcel from "src/hooks/useHandleExcel";
import { AppConstants, EnvConstants } from "src/const";
import dayjs from "dayjs";
import { STATUS_USER } from "src/const/data.const";

const HeaderTablePage = ({
  handleChangeFilterWithKey,
  filter,
  onSuccess,
  data,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openImport, setOpenImport] = useState(false);

  const { handleExportExcel } = useHandleExcel();

  const onExportExcel = async () => {
    try {
      const columns = [
        { name: "No", key: "no", width: 10 },
        { name: "Name", key: "semesterName", width: 30 },
        { name: "Start Time", key: "startTime", width: 20 },
        { name: "End Time", key: "endTime", width: 20 },
        { name: "Description", key: "description", width: 40 },
        { name: "Status", key: "status", width: 20 },
      ];

      const rows = data?.map((item, index) => ({
        no: index + 1,
        semesterName: item.semesterName || "",
        startTime: item?.startTime
          ? dayjs(item.startTime).format("DD/MM/YYYY")
          : "",
        endTime: item?.endTime ? dayjs(item.endTime).format("DD/MM/YYYY") : "",
        description: item.description || "",
        status: item.status || "",
      }));

      handleExportExcel({
        columns,
        rows,
        fileName: "Semester.xlsx",
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
            placeholder: "Search Semester",
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
        <AddSemesterModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={onSuccess}
        />
        <ImportModal
          open={openImport}
          onClose={() => setOpenImport(false)}
          onSuccess={onSuccess}
        />
      </Grid>
    </Grid>
  );
};

export default memo(HeaderTablePage);
