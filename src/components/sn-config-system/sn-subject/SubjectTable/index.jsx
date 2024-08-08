import React, { memo, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import SubjectModalEdit from "../SubjectModalEdit";
import { AppConfirmModal } from "src/components/Common";
import useDeleteSubject from "../hooks/useDeleteSubject";
import ClassSubjectModal from "src/components/sn-config-system/sn-subject/ClassSubjectModal";

const SubjectTable = ({
  subjects,
  pagination,
  isFetching,
  totalData,
  handleChangePage,
  onSuccess,
}) => {
  const [dataSelected, setDataSelected] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);
  const [dataView, setDataView] = useState(null);

  const handleDeleteSubject = useDeleteSubject();

  return (
    <AppTableLayout
      header={<HeaderTable />}
      isLoading={isFetching}
      totalData={totalData}
      currentPage={pagination?.page}
      pageSize={pagination?.size}
      onPageChange={handleChangePage}
    >
      {subjects.map((item, index) => {
        const order = (pagination.page - 1) * pagination.size + (index + 1);
        return (
          <RowTable
            data={item}
            order={order}
            index={item.id}
            onEdit={() => setDataSelected(item)}
            onDelete={() => setDataDelete(item.id)}
            onView={() => setDataView(item)}
          />
        );
      })}
      <SubjectModalEdit
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
          handleDeleteSubject({ id: dataDelete, onSuccess });
          setDataDelete(null);
        }}
        modalTitleProps={{
          title: "Do you confirm to delete this Subject?",
        }}
      />
      <ClassSubjectModal
        data={dataView}
        open={Boolean(dataView)}
        onClose={() => setDataView(null)}
      />
    </AppTableLayout>
  );
};

export default memo(SubjectTable);
