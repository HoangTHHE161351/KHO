import React, { useEffect, useState } from "react";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import HeaderPageTable from "src/components/sn-strange-monitor-manager/HeaderPageTable";
import TableStrangeMonitorManager from "src/components/sn-strange-monitor-manager/TableStrangerMonitorManager";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "src/const/date.const";
import { getURLParams } from "src/utils/common.utils";

const StrangeMonitor = () => {
  const [searchKey, setSearchKey] = useState("");
  const [dateSl, setDateSl] = useState(dayjs().format(DEFAULT_DATE_FORMAT));
  const [roomSelection, setRoomSelection] = useState("");
  const [typeSelection, setTypeSelection] = useState("");

  const { params } = getURLParams();
  const { date, roomId, notType } = params;

  useEffect(() => {
    if (!date || !roomId || !notType) {
      return;
    }

    setDateSl(date);
    setRoomSelection(roomId);
    setTypeSelection(notType);
  }, [date, notType, roomId]);

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderPageTable
          dateUrlPrm={date}
          roomUrlPrm={roomId}
          typeUrlPrm={notType}
          getSearchKey={(value) => setSearchKey(value)}
          getDateSelection={(date) => setDateSl(date)}
          getRoomSelection={(sl) => setRoomSelection(sl)}
          getTypeSelection={(type) => setTypeSelection(type)}
          hiddenClRoomSl
        />
      }
    >
      <TableStrangeMonitorManager
        searchKey={searchKey}
        dateSl={dateSl}
        roomSelection={roomSelection}
        type={typeSelection}
      />
    </AppTablePageLayout>
  );
};

export default StrangeMonitor;
