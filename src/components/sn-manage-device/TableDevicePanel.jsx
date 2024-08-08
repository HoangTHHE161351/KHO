import React, { memo, useEffect, useState } from "react";
import { AppTablePageLayout } from "../Common/TableCommon";
import { FilterDeviceManage, TableDeviceManage } from ".";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import { DeviceService } from "src/services";
import { AppToastNotify } from "src/components/Common";

const TableDevicePanel = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [devices, setDevices] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [pagination, setPagination] = useState(
    DataConstants.PAGINATION_DEFAULT
  );

  const getDeviceAsync = async (filter, pagination) => {
    setIsFetching(true);
    try {
      const response = await DeviceService.getDeviceListService({
        ...filter,
        ...pagination,
      });
      if (response.status === ApiConstants.STT_OK) {
        setDevices(response.data.data.content);
        setTotalData(response.data.data.totalElements);
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response.data.response || "An error occurred",
        });
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.error(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.response || "An error occurred",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const changeFilterWithKey = (key) => (value) => {
    setFilter({ ...filter, [key]: value });
    setPagination(DataConstants.PAGINATION_DEFAULT);
  };

  const handlePageChange = (pagination) => {
    setPagination(pagination);
  };

  useEffect(() => {
    getDeviceAsync(filter, pagination);
  }, [pagination, filter]);

  useEffect(() => {
    return () => {
      setDevices([]);
      setTotalData(0);
      setFilter(DEFAULT_FILTER);
      setPagination(DataConstants.PAGINATION_DEFAULT);
      setIsFetching(false);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <FilterDeviceManage
          handleChangeFilter={changeFilterWithKey}
          filter={filter}
          onSuccess={() =>
            getDeviceAsync(filter, DataConstants.PAGINATION_DEFAULT)
          }
        />
      }
    >
      <TableDeviceManage
        totalData={totalData}
        isFetching={isFetching}
        pagination={pagination}
        devices={devices}
        handlePageChange={handlePageChange}
        onSuccess={() =>
          getDeviceAsync(filter, DataConstants.PAGINATION_DEFAULT)
        }
      />
    </AppTablePageLayout>
  );
};

export default memo(TableDevicePanel);

const DEFAULT_FILTER = {
  search: "",
  roomName: "",
  status: null,
};
