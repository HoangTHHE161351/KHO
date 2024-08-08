import React, { useState, memo } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import UserManageEditModal from "../UserManageEditModal";
import PasswordResetModal from "../PasswordResetModal";
import FacialUserDataModal from "src/components/sn-user-manager/FacialUserDataModal";

const TableUserManager = ({
  isFetching,
  totalData,
  pagination,
  handlePageChange,
  users,
  onSuccess,
  handleChangeStatusSuccess,
  isView = false,
}) => {
  const [open, setOpen] = useState(false);
  const [openFacial, SetOpenFacial] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [facialSelected, setFacialSelected] = useState(null);
  const [userName, setUserName] = useState(null);

  return (
    <>
      <AppTableLayout
        totalData={totalData}
        header={<HeaderTable isView={isView} />}
        isLoading={isFetching}
        currentPage={pagination?.page}
        pageSize={pagination?.size}
        onPageChange={handlePageChange}
      >
        {users?.map((row, index) => {
          const order = (pagination?.page - 1) * pagination?.size + (index + 1);
          return (
            <RowTable
              key={row.id}
              data={row}
              index={order}
              onOpenEdit={() => {
                setRowSelected(row);
                setOpen(true);
              }}
              isView={isView}
              onSuccess={handleChangeStatusSuccess}
              onOpenReset={() => {
                setUserName(row.username);
                setOpenReset(true);
              }}
              onOpenFacial={() => {
                setFacialSelected(row);
                SetOpenFacial(true);
              }}
            />
          );
        })}
      </AppTableLayout>
      <UserManageEditModal
        data={rowSelected}
        open={open}
        onSuccess={onSuccess}
        onClose={() => {
          setRowSelected(null);
          setOpen(false);
        }}
      />
      <PasswordResetModal
        onClose={() => setOpenReset(false)}
        open={openReset}
        userName={userName}
      />
      <FacialUserDataModal
        data={facialSelected}
        open={openFacial}
        onClose={() => {
          setFacialSelected(null);
          SetOpenFacial(false);
        }}
      />
    </>
  );
};

export default memo(TableUserManager);
