import React, { memo, useCallback, useEffect, useState } from "react";
import {
  AppTable,
  AppTableBody,
  AppTableContainer,
  AppTableHead,
  AppTableNoData,
} from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { CheckAttendanceModal, ScheduleDetailModal } from "..";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { DataConstants } from "src/const";
import ScheduleStrangeModal from "src/components/sn-schedule/ScheduleStrangeModal";

const TableSchedule = () => {
  const [open, setOpen] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [dataSelected, setDataSelected] = useState(null);
  const [dataAttend, setDataAttend] = useState(null);
  const [openStrange, setOpenStrange] = useState(false);

  const { userInfo } = useSelector((state) => state.authReducer);

  const { schedules, isFetching } = useSelector(
    (state) => state.scheduleReducer
  );

  const handleClickDetail = useCallback(
    (data) => {
      if (userInfo.roleId === DataConstants.ROLE.TEACHER) {
        if (data?.id) {
          setOpen(true);
          setDataAttend(data);
        }
      } else if (
        userInfo.roleId === DataConstants.ROLE.ADMIN ||
        userInfo.roleId === DataConstants.ROLE.STAFF
      ) {
        setOpenModalInfo(true);
        setDataSelected(data);
      }
    },
    [userInfo]
  );

  useEffect(() => {
    const tableEl = document.getElementById("table");
    const heightWindow = window.innerHeight;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightWindow - tableTop}px`;
  }, []);

  return (
    <>
      <Paper
        className="custom-scrollbar"
        sx={{
          mx: 3,
          overflow: "hidden",
          boxShadow: "unset",
          position: "relative",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <AppTableContainer id="table">
          <AppTable>
            <AppTableHead>
              <HeaderTable HeaderCell={schedules?.[0]} />
            </AppTableHead>
            <AppTableBody>
              {schedules?.slice(1)?.length ? (
                schedules?.slice(1)?.map((schedule, index) => (
                  <RowTable
                    key={index}
                    data={schedule}
                    onClickDetail={(data) => {
                      handleClickDetail(data);
                    }}
                    onClickLog={(data) => {
                      setOpenStrange(true);
                      setDataSelected(data);
                    }}
                  />
                ))
              ) : (
                <AppTableNoData isLoading={isFetching} />
              )}
            </AppTableBody>
          </AppTable>
        </AppTableContainer>
      </Paper>
      <CheckAttendanceModal
        data={dataAttend}
        open={open}
        onClose={() => setOpen(false)}
      />
      <ScheduleStrangeModal
        open={openStrange}
        data={dataSelected}
        onClose={() => {
          setOpenStrange(false);
          setDataSelected(null);
        }}
      />
      <ScheduleDetailModal
        data={dataSelected}
        open={openModalInfo}
        onClose={() => {
          setOpenModalInfo(false);
          setDataSelected(null);
        }}
      />
    </>
  );
};

export default memo(TableSchedule);
