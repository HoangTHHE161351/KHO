import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import { useEffect, useState } from "react";
import useDeleteStudentClass from "../hooks/useDeleteStudentClass";
import { Box, Button, Grid } from "@mui/material";
import AddStudentClassModal from "../AddStudentClassModal";
import { AppConfirmModal } from "src/components/Common";

const StudentClassTable = ({ data, isFetching, reloadApi, classDetail }) => {
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);

  useEffect(() => {
    const tableEl = document.getElementById("table-class-student");
    const modalEl = document.getElementById("modal-customer");
    const heightModal = modalEl.offsetHeight;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightModal - tableTop - 36 - 16}px`;
  }, []);

  const handleDeleteStudentClass = useDeleteStudentClass();

  return (
    <>
      <Box>
        <Grid container columnSpacing={2} px={3} mb={2}>
          <Grid flex={1} container justifyContent="flex-end">
            <Button variant="contained" onClick={() => setOpen(true)}>
              Add Student
            </Button>
          </Grid>
        </Grid>
        <AppTableLayout
          header={<HeaderTable />}
          isLoading={isFetching}
          totalData={data?.length}
          id="table-class-student"
        >
          {data?.map((item, index) => (
            <RowTable
              order={index + 1}
              row={item}
              onDelete={() => {
                setDataDelete(item);
              }}
            />
          ))}
        </AppTableLayout>
      </Box>
      <AppConfirmModal
        onCancel={() => setDataDelete(null)}
        onClose={() => setDataDelete(null)}
        onConfirm={() => {
          handleDeleteStudentClass({
            id: dataDelete?.id,
            onSuccess: reloadApi,
          });
          setDataDelete(null);
        }}
        modalTitleProps={{
          title: "Do you confirm that you want to delete this student?",
        }}
      />
      <AddStudentClassModal
        open={open}
        onClose={() => setOpen(false)}
        data={classDetail}
        onSuccess={reloadApi}
      />
    </>
  );
};

export default StudentClassTable;
