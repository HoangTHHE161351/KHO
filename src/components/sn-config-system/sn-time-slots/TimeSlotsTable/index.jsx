import React, { memo, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import { AppConfirmModal } from "src/components/Common";
import RoomModalEdit from "../TimeSlotsModalEdit";
import useDeleteTimeSlots from "../hooks/useDeleteTimeSlots";

const TimeSlotsTable = ({
  isFetching,
  totalData,
  data,
  pagination,
  handlePageChange,
  reloadApi,
}) => {
  const handleDeleteTimeSlots = useDeleteTimeSlots({ onSuccess: reloadApi });
  const [dataSelected, setDataSelected] = useState(null);
  const [selectDelete, setSelectDelete] = useState(null);

  return (
    <AppTableLayout
      totalData={totalData}
      header={<HeaderTable />}
      isLoading={isFetching}
      currentPage={pagination.page}
      pageSize={pagination.size}
      onPageChange={handlePageChange}
    >
      {data.map((data, index) => {
        const order = (pagination.page - 1) * pagination.size + index + 1;
        return (
          <RowTable
            key={data.id}
            data={data}
            order={order}
            onEdit={() => setDataSelected(data)}
            onDelete={() => setSelectDelete(data.id)}
          />
        );
      })}
      <RoomModalEdit
        data={dataSelected}
        open={Boolean(dataSelected)}
        onClose={() => {
          setDataSelected(null);
        }}
        onSuccess={reloadApi}
      />
      <AppConfirmModal
        modalTitleProps={{
          title: "You are about to delete this time slot. Are you sure?",
        }}
        open={Boolean(selectDelete)}
        onCancel={() => setSelectDelete(null)}
        onClose={() => setSelectDelete(null)}
        onConfirm={() => {
          handleDeleteTimeSlots({ id: selectDelete, onSuccess: reloadApi });
          setSelectDelete(null);
        }}
      />
    </AppTableLayout>
  );
};

export default memo(TimeSlotsTable);
