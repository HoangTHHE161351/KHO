import React, { memo, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import DeviceEditModal from "src/components/sn-manage-device/DeviceEditModal";
import { AppConfirmModal } from "src/components/Common";
import useDeviceAction from "src/components/sn-manage-device/hooks/useDeviceAction";

const TableDeviceManage = ({
  devices,
  pagination,
  totalData,
  isFetching,
  handlePageChange,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { handleDeleteDevice } = useDeviceAction();

  return (
    <AppTableLayout
      totalData={totalData}
      header={<HeaderTable />}
      isLoading={isFetching}
      onPageChange={handlePageChange}
      currentPage={pagination?.page}
      pageSize={pagination?.size}
    >
      {devices.map((device, index) => {
        const order = (pagination?.page - 1) * pagination?.size + index + 1;
        return (
          <RowTable
            key={device.id}
            row={device}
            order={order}
            onSuccess={onSuccess}
            onDelete={() => setDeleteId(device.id)}
            onEdit={() => {
              setRowSelected(device);
              setOpen(true);
            }}
          />
        );
      })}
      <DeviceEditModal
        data={rowSelected}
        open={open}
        onClose={() => {
          setRowSelected(null);
          setOpen(false);
        }}
        onSuccess={onSuccess}
      />
      <AppConfirmModal
        open={!!deleteId}
        modalTitleProps={{
          title: "You are about to delete this device",
        }}
        onCancel={() => setDeleteId(null)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          handleDeleteDevice(deleteId, onSuccess);
          setDeleteId(null);
        }}
      />
    </AppTableLayout>
  );
};

export default memo(TableDeviceManage);
