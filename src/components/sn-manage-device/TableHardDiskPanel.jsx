import React, { memo, useEffect, useState } from "react";
import { DeviceService } from "src/services";
import { AppTablePageLayout } from "../Common/TableCommon";
import { TableHardDisk } from ".";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { AppToastNotify } from "../Common";

const TableHardDiskPanel = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [hardDisks, setHardDisks] = useState([]);

  const getHardDiskService = async () => {
    setIsFetching(true);
    try {
      const response = await DeviceService.getHardDiskService();

      if (response.status === ApiConstants.STT_OK) {
        setHardDisks(response?.data?.data);
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getHardDiskService();

    return () => {
      setHardDisks([]);
      setIsFetching(false);
    };
  }, []);

  return (
    <AppTablePageLayout>
      <TableHardDisk hardDisks={hardDisks} isFetching={isFetching} />
    </AppTablePageLayout>
  );
};

export default memo(TableHardDiskPanel);
