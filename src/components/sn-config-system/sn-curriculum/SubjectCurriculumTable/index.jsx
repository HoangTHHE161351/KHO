import React, { useEffect, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import { Box, Button, Grid } from "@mui/material";
import AddSubjectModal from "../AddSubjectModal";
import { CurriculumService } from "src/services";
import { AppConfirmModal, AppToastNotify } from "src/components/Common";
import { AppConstants } from "src/const";

const SubjectCurriculumTable = ({
  data,
  isFetching,
  reloadApi,
  curriculumDetail,
}) => {
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteSubjectCurriculum = async () => {
    setIsLoading(true);
    try {
      if (!dataDelete)
        throw new Error("Please select  subject to delete against!");
      const response = await CurriculumService.deleteSubjectCurriculum({
        id: dataDelete.id,
      });
      if (response.status === 200) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Delete subject successfully",
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
    const tableEl = document.getElementById("table-subject-curriculum");
    const modalEl = document.getElementById("modal-customer");
    const heightModal = modalEl.offsetHeight;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightModal - tableTop - 36 - 16}px`;
  }, []);

  return (
    <Box>
      <Grid container columnSpacing={2} px={3} mb={2}>
        <Grid flex={1} container justifyContent="flex-end">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Subject
          </Button>
        </Grid>
      </Grid>
      <AppTableLayout
        header={<HeaderTable />}
        isLoading={isFetching}
        totalData={data?.length}
        id="table-subject-curriculum"
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
        onConfirm={deleteSubjectCurriculum}
      />
      <AddSubjectModal
        open={open}
        onClose={() => setOpen(false)}
        data={curriculumDetail}
        onSuccess={reloadApi}
      />
    </Box>
  );
};

export default SubjectCurriculumTable;
