import React, { useState, useEffect } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { getAttendReport } from "src/services/Attendance.service";

const AttendanceReportTableManager = ({
  dateSl,
  searchKey,
  classroomSelection,
  semesterSelection,
}) => {
  const [attendReport, setAttendReport] = useState([]);
  const [screenState, setScreenState] = useState({
    isLoading: false,
    currentPage: 1,
    pageIndex: 1,
    pageSize: 10,
  });
  const [totalData, setTotalData] = useState();
  //Call API here to input data to historyLogs
  const getAttendReports = async (params) => {
    setScreenState((prev) => ({ ...prev, isLoading: true }));
    setScreenState((prev) => ({ ...prev, currentPage: 1 }));

    try {
      const response = await getAttendReport(params);
      console.log("Response:", response); // Check response structure
      const data = response?.payload?.data;
      console.log("Data:", data); // Check fetched data

      if (data) {
        // Update attendReport with the fetched data
        setAttendReport(data);
        setTotalData(data.length);
      }
    } catch (error) {
      console.log("Error fetching attendance report:", error);
      // Handle error state if needed
    }

    setScreenState((prev) => ({ ...prev, isLoading: false }));
  };



  const handleOnPageChange = (value) => {
    const pagee = value?.page || 1;
    const sizee = value?.size || 10;

    setScreenState((prev) => ({
      ...prev,
      pageSize: sizee || 10,
      currentPage: pagee || 1,
    }));

    const params = {
      search: searchKey,
      classId: classroomSelection,
      semesterId: semesterSelection,
      page: value?.page || 1,
      size: value?.size || 10,
    };
    console.log("Page+++:", params.page); // Log the page value
    console.log("Size++++:", params.size); // Log the size value
    console.log("Type++++:", params.type); // Log the size value
    console.log("Semester++++:", params.semesterId); // Log the size value
    console.log("Class++++:", params.classId); // Log the size value
    getAttendReports(params);
  };

  // Init data
  useEffect(() => {
    setScreenState((prev) => ({ ...prev, isLoading: true }));
    const params = {
      search: searchKey,
      classId: classroomSelection,
      semesterId: semesterSelection,
      date: dateSl,
      page: 1,
      size: 10,
    };
    getAttendReports(params);
    setScreenState((prev) => ({ ...prev, isLoading: false }));
  }, [searchKey, classroomSelection, semesterSelection]);


  return (
    <>
      <AppTableLayout
        totalData={totalData}
        header={<HeaderTable />}
        isLoading={screenState.isLoading}
        onPageChange={handleOnPageChange}
        currentPage={screenState.currentPage}
        pageSize={screenState.pageSize}
      >
        {console.log("attendReport ==:", attendReport)}
        {attendReport?.map((item, index) => (
          <RowTable
            key={item.id}
            index={index}
            attendReportData={item} // Pass `attendReportData` as prop to RowTable
            page={screenState.currentPage}
            size={screenState.pageSize}
          />
        ))}
      </AppTableLayout>
    </>
  );
};

export default AttendanceReportTableManager;
