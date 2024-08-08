import React, { useCallback, useEffect, useState } from "react";
import { AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import HeaderPageTable from "src/components/sn-config-system/sn-time-slots/HeaderPageTable";
import TimeSlotsTable from "src/components/sn-config-system/sn-time-slots/TimeSlotsTable";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import { TimeSlotService } from "src/services";

const TimeSlots = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState(
    DataConstants.PAGINATION_DEFAULT
  );
  const [filter, setFilter] = useState({
    status: AppConstants.VALUE_SELECT_ALL,
  });

  const getTimeSlots = async ({ filterTimeSlot, paginationTimeSlot }) => {
    setIsFetching(true);
    try {
      const response = await TimeSlotService.getTimeSlotsList({
        ...handleConvertFilter(filterTimeSlot),
        ...paginationTimeSlot,
      });

      if (response.status === ApiConstants.STT_OK) {
        setResultData(response.data.data.content);
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

  const handleChangeFilterWithKey = useCallback(
    (key) => (value) => {
      setFilter((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handlePageChange = useCallback((page) => {
    setPagination(page);
  }, []);

  const reloadApi = () => {
    getTimeSlots({
      filterTimeSlot: filter,
      paginationTimeSlot: DataConstants.PAGINATION_DEFAULT,
    });
  };

  useEffect(() => {
    getTimeSlots({
      filterTimeSlot: filter,
      paginationTimeSlot: pagination,
    });
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setTotalData(0);
      setResultData([]);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderPageTable
          reloadApi={reloadApi}
          data={resultData}
          handleChangeFilterWithKey={handleChangeFilterWithKey}
          filter={filter}
        />
      }
    >
      <TimeSlotsTable
        isFetching={isFetching}
        handlePageChange={handlePageChange}
        totalData={totalData}
        resultData={resultData}
        data={resultData}
        pagination={pagination}
        reloadApi={reloadApi}
      />
    </AppTablePageLayout>
  );
};

export default TimeSlots;

export const handleConvertFilter = (filter) => {
  const newFilter = { ...filter };
  if (Object.keys(newFilter).length) {
    for (let key in newFilter) {
      const newValue = newFilter[key];
      switch (key) {
        case "status":
          if (newValue === AppConstants.VALUE_SELECT_ALL) {
            newFilter[key] = undefined;
          } else {
            newFilter[key] = newValue;
          }
          break;

        case "search":
          newFilter[key] = newFilter.search || null;
          break;
        default:
          break;
      }
    }
  }
  return newFilter;
};
