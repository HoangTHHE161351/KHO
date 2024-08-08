import React, { useState } from "react";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import HeaderPageTable from "src/components/sn-manager-log/HeaderPageTable";
import HistoryLogTableManager from "src/components/sn-manager-log/Table-log";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";

const HistoryLog = () => {
  const [searchKey, setSearchKey] = useState("");
  const [dateSl, setDateSl] = useState(dayjs().format(DEFAULT_DATE_FORMAT));
  const [roomSelection, setRoomSelection] = useState("");

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderPageTable
          getSearchKey={(value) => setSearchKey(value)}
          getDateSelection={(date) => setDateSl(date)}
          getRoomSelection={(sl) => setRoomSelection(sl)}
          hiddenClRoomSl
        />
      }
    >
      <HistoryLogTableManager
        searchKey={searchKey}
        dateSl={dateSl}
        roomSelection={roomSelection}
      />
    </AppTablePageLayout>
  );
};

export default HistoryLog;
