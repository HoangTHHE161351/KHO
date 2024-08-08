import React, { useState } from "react";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import HeaderPageTable from "src/components/sn-attendance-manager/HeaderPageTable";
import AttendanceTableManager from "src/components/sn-attendance-manager/AttendanceTable";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";

const AttendanceManager = () => {
  const [searchKey, setSearchKey] = useState("");
  const [dateSl, setDateSl] = useState(dayjs().format(DEFAULT_DATE_FORMAT));
  const [slotSelection, setSlotSelection] = useState("");
  const [subjectSelection, setSubjectSelection] = useState("");
  const [classroomSelection, setClassroomSelection] = useState("");

  return (
    <AppTablePageLayout headerFilter={
      <HeaderPageTable
        getSearchKey={(value) => setSearchKey(value)}
        getDateSelection={(date) => setDateSl(date)}
        getSlotSelection={(slot) => setSlotSelection(slot)}
        getClassroomSelection={(clr) => setClassroomSelection(clr)}
        getSubjectSelection={(subject) => setSubjectSelection(subject)}
      />
    }>
      <AttendanceTableManager
        searchKey={searchKey}
        dateSl={dateSl}
        slotSelection={slotSelection}
        subjectSelection={subjectSelection}
        classroomSelection={classroomSelection}
      />
    </AppTablePageLayout>
  );
};

export default AttendanceManager;
