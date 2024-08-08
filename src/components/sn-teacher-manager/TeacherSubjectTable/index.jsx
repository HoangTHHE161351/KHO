import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import {
  AppCommonLoading,
  AppConfirmModal,
  AppToastNotify,
} from "src/components/Common";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { TeacherService } from "src/services";
import { AppConstants } from "src/const";
import TeacherSubjectAddModal from "src/components/sn-teacher-manager/TeacherSubjectAddModal";

const TeacherSubjectTable = ({
  data,
  reloadApi,
  isFetching,
  teacherDetail,
}) => {
  const [open, setOpen] = React.useState(false);
  const [dataDelete, setDataDelete] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteClassSubject = async () => {
    setIsLoading(true);
    try {
      if (!dataDelete)
        throw new Error("Please select subject to delete against!");
      const response = await TeacherService.deleteTeacherSubject({
        id: dataDelete.id,
      });
      if (response.status === 200) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Delete class subject successfully",
        });
        reloadApi();
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.data?.message || "An error occurred",
        });
      }
    } catch (error) {
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error.message ||
          "An error occurred",
      });
    } finally {
      setIsLoading(false);
      setDataDelete(null);
    }
  };

  useEffect(() => {
    const tableEl = document.getElementById("table-class-subject");
    const modalEl = document.getElementById("modal-customer");
    const heightModal = modalEl.offsetHeight;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightModal - tableTop - 36 - 16}px`;
  }, []);

  return (
    <>
      <AppCommonLoading isFetching={isLoading} />
      <Box>
        <Grid container columnSpacing={2} px={3} mb={2}>
          <Grid flex={1} container justifyContent="flex-end">
            <Button variant="contained" onClick={() => setOpen(true)}>
              Add Student
            </Button>
          </Grid>
        </Grid>
        <AppTableLayout
          isLoading={isFetching}
          totalData={data?.length}
          header={<HeaderTable />}
          id="table-class-subject"
        >
          {data.map((row, index) => (
            <RowTable
              key={row.id}
              data={row}
              order={index + 1}
              onDelete={() => setDataDelete(row)}
            />
          ))}
        </AppTableLayout>
        <AppConfirmModal
          modalTitleProps={{
            title: "Do you confirm to delete this subject?",
          }}
          open={Boolean(dataDelete)}
          onCancel={() => setDataDelete(null)}
          onClose={() => setDataDelete(null)}
          onConfirm={deleteClassSubject}
        />
        <TeacherSubjectAddModal
          open={open}
          onClose={() => setOpen(false)}
          teacherDetail={teacherDetail}
          onSuccess={reloadApi}
        />
      </Box>
    </>
  );
};

export default TeacherSubjectTable;
