import { Button, Grid, Stack } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  AppMenuItem,
  AppSearchDebounce,
  AppSelectFilter,
  AppToastNotify,
} from "../Common";
import useExportStudent from "./hooks/useExportStudent";
import AppAutoCompleteMUI from "../Common/AppAutoCompleteMUI";
import { CurriculumService } from "src/services";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import ImportStudentCurriculumModal from "./ImportStudentCurriculumModal";
import { STATUS_USER } from "src/const/data.const";

const FilterTable = ({ handleChangeFilterWithKey, filter }) => {
  const [curriculums, setCurriculums] = useState([]);
  const [open, setOpen] = useState(false);

  const getCurriculumAsync = async () => {
    try {
      const response = await CurriculumService.getCurriculumList({});
      if (response.status === ApiConstants.STT_OK) {
        setCurriculums(response.data.data.content);
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.error(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.response || "An error occurred",
      });
    }
  };

  const handleExportExcel = useExportStudent();

  useEffect(() => {
    getCurriculumAsync();
  }, []);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={2.4}>
        <AppSearchDebounce
          onChangeValue={handleChangeFilterWithKey("search")}
          placeholder="Search"
          valueInput={filter.search}
        />
      </Grid>
      <Grid item xs={2.4}>
        <AppAutoCompleteMUI
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
        </AppAutoCompleteMUI>
      </Grid>
      <Grid item xs={2.4}>
        <AppAutoCompleteMUI
          label="Curriculum Name"
          options={covertToList(curriculums)}
          value={filter?.curriculumName}
          onChange={(_, data) =>
            handleChangeFilterWithKey("curriculumName")(data)
          }
        />
      </Grid>
      <Grid item container flex={1} justifyContent={"flex-end"}>
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => setOpen(true)}
          >
            Import Student Curriculum Excel
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleExportExcel(filter, "student_export")}
          >
            Export Student Excel
          </Button>
        </Stack>
      </Grid>
      <ImportStudentCurriculumModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </Grid>
  );
};

export default memo(FilterTable);

const covertToList = (data) => {
  return data?.map((item) => {
    return item.curriculumName;
  });
};
