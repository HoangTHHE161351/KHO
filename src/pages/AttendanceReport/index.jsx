import React, { useState } from "react";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import HeaderPageTable from "src/components/sn-attendance-report/HeaderPageTable";
import AttendanceReportTableManager from "src/components/sn-attendance-report/Attendance-Report";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";

const AttendanceReport = () => {
  const [searchKey, setSearchKey] = useState("");
  const [dateSl, setDateSl] = useState(dayjs().format(DEFAULT_DATE_FORMAT));
  const [semesterSelection, setSemesterSelection] = useState("");
  const [classroomSelection, setClassroomSelection] = useState("");

  return (
    <AppTablePageLayout headerFilter={<HeaderPageTable
      getSearchKey={(value) => setSearchKey(value)}
      getDateSelection={(date) => setDateSl(date)}
      getSemesterSelection={(semester) => setSemesterSelection(semester)}
      getClassroomSelection={(clr) => setClassroomSelection(clr)}
    />
    }>
       {console.log("================", semesterSelection)}
       {console.log("================", classroomSelection)}
      <AttendanceReportTableManager     
        searchKey={searchKey}
        dateSl={dateSl}
        semesterSelection={semesterSelection}
        classroomSelection={classroomSelection}
       
      />
    </AppTablePageLayout>
  );
};

export default AttendanceReport;
