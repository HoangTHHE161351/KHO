import React, { memo, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import { AppConfirmModal } from "src/components/Common";
import useDeleteRoom from "../hooks/useDeleteRoom";
import RoomModalEdit from "../RoomModalEdit";

const RoomTable = ({
  handleChangePage,
  rooms,
  pagination,
  totalData,
  isFetching,
  onSuccess,
}) => {
  const handleDeleteRoom = useDeleteRoom();
  const [dataSelected, setDataSelected] = useState(null);
  const [selectDelete, setSelectDelete] = useState(null);

  return (
    <AppTableLayout
      totalData={totalData}
      header={<HeaderTable />}
      isLoading={isFetching}
      currentPage={pagination.page}
      pageSize={pagination.size}
      onPageChange={handleChangePage}
    >
      {rooms?.map((data, index) => {
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
        onSuccess={onSuccess}
      />
      <AppConfirmModal
        modalTitleProps={{
          title: "You are about to delete this room. Are you sure?",
        }}
        open={Boolean(selectDelete)}
        onCancel={() => setSelectDelete(null)}
        onClose={() => setSelectDelete(null)}
        onConfirm={() => {
          handleDeleteRoom({ id: selectDelete, onSuccess });
          setSelectDelete(null);
        }}
      />
    </AppTableLayout>
  );
};

export default memo(RoomTable);
