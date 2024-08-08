import { Button, Stack } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import TableScheduleStrange from "src/components/sn-schedule/TableScheduleStrange";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import { StrangeService } from "src/services";

const ScheduleStrangeModal = ({ data, open, onClose }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [strangeLogs, setStrangeLogs] = useState([]);
  const [pagination, setPagination] = useState(
    DataConstants.PAGINATION_DEFAULT
  );

  const getUserList = async (id, pagination) => {
    setIsFetching(true);
    try {
      const response = await StrangeService.getScheduleStrange({
        scheduleId: id,
        ...pagination,
      });
      if (response.status === ApiConstants.STT_OK) {
        setStrangeLogs(response.data.data.content);
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

  const handlePageChange = (pagination) => {
    setPagination(pagination);
  };

  useEffect(() => {
    if (data?.id) {
      getUserList(data.id, pagination);
    }
  }, [data?.id, pagination]);

  useEffect(() => {
    return () => {
      setStrangeLogs([]);
      setTotalData(0);
      setPagination(DataConstants.PAGINATION_DEFAULT);
    };
  }, []);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      modalTitleProps={{
        title: "Stranger Log Schedule",
      }}
      sx={{
        minHeight: 500,
        "&& .MuiDialog-paper": {
          minWidth: 1200,
        },
      }}
      modalContentProps={{
        content: (
          <AppTablePageLayout
            headerFilter={
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getUserList(data.id, pagination)}
                >
                  Reset
                </Button>
              </Stack>
            }
          >
            <TableScheduleStrange
              data={strangeLogs}
              handlePageChange={handlePageChange}
              isFetching={isFetching}
              pagination={pagination}
              totalData={totalData}
            />
          </AppTablePageLayout>
        ),
      }}
    />
  );
};

export default memo(ScheduleStrangeModal);
