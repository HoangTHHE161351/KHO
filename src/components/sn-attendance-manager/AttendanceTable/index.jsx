import React, { useEffect, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import {
  getAttendanceListLogs,
  updateAttendance,
} from "src/services/Attendance.service";
import { Button } from "@mui/material";
import { AppConstants, EnvConstants } from "src/const";
import { AppToastNotify } from "src/components/Common";

const AttendanceTableManager = ({
  dateSl,
  searchKey,
  classroomSelection,
  subjectSelection,
  slotSelection,
}) => {
  const [addtendListLogs, setAttendListLogs] = useState([]);
  const [screenState, setScreenState] = useState({
    isLoading: false,
    currentPage: 1,
    pageIndex: 1,
    pageSize: 10,
  });
  const [dataChangeAttend, setDataChangeAttend] = useState([]);

  const getAttendListLogs = async (params) => {
    setScreenState((prev) => ({ ...prev, isLoading: true }));
    // setScreenState((prev) => ({ ...prev, currentPage: 1 }));
    try {
      const response = await getAttendanceListLogs(params);
      const data = response?.payload?.data;
      if (data) {
        setAttendListLogs({
          ...data,
          content: data.content.map((item) => {
            const data = dataChangeAttend.find(
              (itemcheck) => itemcheck.attendenceId === item.attendenceId
            );
            if (data) {
              return data;
            } else {
              return item;
            }
          }),
        });
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log("error: ", error);
      //TODO: handle error
    } finally {
      setScreenState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleOnPageChange = (value) => {
    const pagee = value?.page || 1;
    const sizee = value?.size || 10;

    setScreenState((prev) => ({
      ...prev,
      pageSize: sizee || 10,
      currentPage: pagee || 1,
    }));
  };

  // Init data
  useEffect(() => {
    const params = {
      search: searchKey,
      classId: classroomSelection,
      slotId: slotSelection,
      subjectId: subjectSelection,
      date: dateSl,
      page: screenState.currentPage,
      size: screenState.pageSize,
    };
    getAttendListLogs(params);
  }, [
    searchKey,
    dateSl,
    classroomSelection,
    subjectSelection,
    slotSelection,
    screenState.currentPage,
    screenState.pageSize,
  ]);

  const handleSubmit = async () => {
    try {
      const params = dataChangeAttend.map((item) => ({
        attendanceId: item.attendenceId ?? "",
        status: item.status ?? "",
      }));
      const response = await updateAttendance(params);
      const code = response?.payload?.code;
      if (code === 200) {
        const params = {
          search: searchKey,
          classId: classroomSelection,
          slotId: slotSelection,
          subjectId: subjectSelection,
          date: dateSl,
          page: screenState.currentPage,
          size: screenState.pageSize,
        };
        getAttendListLogs(params);
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Update attendance success!",
        });
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log("error: ", error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: "Try again",
      });
    }
  };

  const changeMasterData = (data) => {
    const index = dataChangeAttend.findIndex(
      (record) => record.attendenceId === data.attendenceId
    );
    if (index === -1) {
      setDataChangeAttend((prevData) => [...prevData, data]);
    } else {
      let newData = dataChangeAttend;
      newData[index] = data;
      setDataChangeAttend(newData);
    }
  };

  return (
    <AppTableLayout
      totalData={addtendListLogs?.totalElements}
      header={<HeaderTable />}
      isLoading={screenState.isLoading}
      onPageChange={handleOnPageChange}
      currentPage={screenState.currentPage}
      pageSize={screenState.pageSize}
    >
      {addtendListLogs?.content?.map((item, index) => {
        const order =
          index + 1 + screenState.pageSize * (screenState.currentPage - 1);
        return (
          <RowTable
            index={order}
            attendanceData={item}
            page={screenState.currentPage}
            size={screenState.pageSize}
            changeMasterData={changeMasterData}
          />
        );
      })}
      {<Button onClick={handleSubmit}>Submit</Button>}
    </AppTableLayout>
  );
};

export default AttendanceTableManager;
