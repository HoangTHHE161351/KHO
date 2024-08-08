import React, { memo, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import { AppConfirmModal } from "src/components/Common";
import useDeleteCurriculum from "../hooks/useDeleteCurriculum";
import CurriculumModalEdit from "../CurriculumModalEdit";
import SubjectCurriculumModal from "../SubjectCurriculumModal";

const CurriculumTable = ({
  totalData,
  isFetching,
  pagination,
  handleChangePage,
  curriculums,
  onSuccess,
}) => {
  const [dataSelected, setDataSelected] = useState(null);
  const [selectDelete, setSelectDelete] = useState(null);
  const [dataView, setDataView] = useState(null);

  const handleDeleteCurriculum = useDeleteCurriculum();

  return (
    <AppTableLayout
      totalData={totalData}
      header={<HeaderTable />}
      isLoading={isFetching}
      currentPage={pagination.page}
      pageSize={pagination.size}
      onPageChange={handleChangePage}
    >
      {curriculums?.map((data, index) => {
        const order = (pagination.page - 1) * pagination.size + index + 1;
        return (
          <RowTable
            key={data.id}
            data={data}
            order={order}
            onEdit={() => setDataSelected(data)}
            onDelete={() => setSelectDelete(data.id)}
            onOpenView={() => setDataView(data)}
          />
        );
      })}
      <CurriculumModalEdit
        data={dataSelected}
        open={Boolean(dataSelected)}
        onClose={() => {
          setDataSelected(null);
        }}
        onSuccess={onSuccess}
      />
      <AppConfirmModal
        modalTitleProps={{
          title: "You are about to delete this curriculum. Are you sure?",
        }}
        open={Boolean(selectDelete)}
        onCancel={() => setSelectDelete(null)}
        onClose={() => setSelectDelete(null)}
        onConfirm={() => {
          handleDeleteCurriculum({ id: selectDelete, onSuccess });
          setSelectDelete(null);
        }}
      />
      <SubjectCurriculumModal
        data={dataView}
        open={Boolean(dataView)}
        onClose={() => setDataView(null)}
      />
    </AppTableLayout>
  );
};

export default memo(CurriculumTable);
