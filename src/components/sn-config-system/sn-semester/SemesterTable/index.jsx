import React, { useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import SemesterModalEdit from "../SemesterModalEdit";
import { AppConfirmModal } from "src/components/Common";
import useDeleteSemester from "../hooks/useDeleteSemester";

const SemesterTable = ({
  semesters,
  isFetching,
  totalData,
  handleChangePage,
  pagination,
  onSuccess,
}) => {
  const [dataSelected, setDataSelected] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);

  const handleDeleteSemester = useDeleteSemester();
  return (
    <AppTableLayout
      header={<HeaderTable />}
      isLoading={isFetching}
      totalData={totalData}
      currentPage={pagination?.page}
      pageSize={pagination?.size}
      onPageChange={handleChangePage}
    >
      {semesters?.map((item, index) => {
        const order = (pagination.page - 1) * pagination.size + (index + 1);
        return (
          <RowTable
            key={item.id}
            data={item}
            order={order}
            // index={item.id}
            onEdit={() => setDataSelected(item)}
            onDelete={() => setDataDelete(item.id)}
          />
        );
      })}
      <SemesterModalEdit
        open={Boolean(dataSelected)}
        onClose={() => setDataSelected(null)}
        data={dataSelected}
        onSuccess={onSuccess}
      />
      <AppConfirmModal
        open={Boolean(dataDelete)}
        onCancel={() => setDataDelete(null)}
        onClose={() => setDataDelete(null)}
        onConfirm={() => {
          handleDeleteSemester({ id: dataDelete, onSuccess });
          setDataDelete(null);
        }}
        modalTitleProps={{
          title: "Do you confirm to delete this Semester?",
        }}
      />
    </AppTableLayout>
  );
};

export default SemesterTable;
