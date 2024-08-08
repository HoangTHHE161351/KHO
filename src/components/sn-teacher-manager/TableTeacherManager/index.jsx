import React, { useState, useEffect } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import TeacherManageEditModal from "../TeacherManageEditModal";
import PasswordResetModal from "../PasswordResetModal";
import { AppConstants, EnvConstants } from "src/const";
import { TeacherService } from "src/services";
import { AppToastNotify } from "src/components/Common";
import TeacherSubjectModal from "src/components/sn-teacher-manager/TeacherSubjectModal";

const TableTeacherManager = ({
  isFetching,
  totalData,
  pagination,
  handlePageChange,
  teachers,
  onSuccess,
  handleChangeStatusSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [rowView, setRowView] = useState(null);
  const [userName, setUserName] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [isFetchingSubjects, setIsFetchingSubjects] = useState(false);

  const getSubjectTeacherAsync = async (id) => {
    setIsFetchingSubjects(true);
    try {
      const response = await TeacherService.getTeacherSubjectList({ id });
      if (response.status === 200) {
        setSubjects(response.data.data);
      } else {
        throw new Error(response.data?.response || "An error occurred");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.error(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error.message ||
          "An error occurred",
      });
    } finally {
      setIsFetchingSubjects(false);
    }
  };

  useEffect(() => {
    if (rowSelected?.id) {
      getSubjectTeacherAsync(rowSelected.id);
    }
  }, [rowSelected?.id]);

  return (
    <>
      <AppTableLayout
        totalData={totalData}
        header={<HeaderTable />}
        isLoading={isFetching}
        currentPage={pagination?.page}
        pageSize={pagination?.size}
        onPageChange={handlePageChange}
      >
        {teachers.map((row, index) => {
          const order = (pagination?.page - 1) * pagination?.size + (index + 1);
          return (
            <RowTable
              key={order}
              data={row}
              index={order}
              onOpenEdit={() => {
                setRowSelected(row);
                setOpen(true);
              }}
              onOpenView={() => setRowView(row)}
              onSuccess={handleChangeStatusSuccess}
              onOpenReset={() => {
                setUserName(row.username);
                setOpenReset(true);
              }}
            />
          );
        })}
      </AppTableLayout>
      <TeacherManageEditModal
        data={rowSelected}
        open={open}
        onClose={() => {
          setRowSelected(null);
          setSubjects([]);
          setOpen(false);
        }}
        onSuccess={onSuccess}
        subjects={subjects}
        isFetchingSubjects={isFetchingSubjects}
      />
      <TeacherSubjectModal
        data={rowView}
        open={Boolean(rowView)}
        onClose={() => setRowView(null)}
      />
      <PasswordResetModal
        onClose={() => setOpenReset(false)}
        open={openReset}
        userName={userName}
      />
    </>
  );
};

export default TableTeacherManager;
