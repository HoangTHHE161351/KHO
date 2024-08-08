import React, { memo, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import ClassModalEdit from "../ClassModalEdit";
import { AppConfirmModal } from "src/components/Common";
import useDeleteClass from "../hooks/useDeleteClass";
import StudentClassModal from "../StudentClassModal";

const ClassTable = ({
  isFetching,
  totalData,
  pagination,
  handleChangePage,
  classes,
  onSuccess,
}) => {
  const [dataSelected, setDataSelected] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);
  const [dataView, setDataView] = useState(null);
  const handleDeleteClass = useDeleteClass();

  return (
    <AppTableLayout
      header={<HeaderTable />}
      isLoading={isFetching}
      totalData={totalData}
      currentPage={pagination.page}
      pageSize={pagination.size}
      onPageChange={handleChangePage}
    >
      {classes.map((item, index) => {
        const order = (pagination.page - 1) * pagination.size + (index + 1);
        return (
          <RowTable
            key={item.id}
            data={item}
            order={order}
            index={item.id}
            onEdit={() => setDataSelected(item)}
            onDelete={() => setDataDelete(item.id)}
            onView={() => setDataView(item)}
          />
        );
      })}
      <ClassModalEdit
        open={Boolean(dataSelected)}
        onClose={() => {
          setDataSelected(null);
        }}
        onSuccess={onSuccess}
        data={dataSelected}
      />
      <AppConfirmModal
        open={Boolean(dataDelete)}
        onCancel={() => setDataDelete(null)}
        onClose={() => setDataDelete(null)}
        onConfirm={() => {
          handleDeleteClass({ id: dataDelete, onSuccess });
          setDataDelete(null);
        }}
        modalTitleProps={{
          title: "Do you confirm to delete this class?",
        }}
      />
      <StudentClassModal
        open={Boolean(dataView)}
        data={dataView}
        onClose={() => setDataView(null)}
      />
    </AppTableLayout>
  );
};

export default memo(ClassTable);
