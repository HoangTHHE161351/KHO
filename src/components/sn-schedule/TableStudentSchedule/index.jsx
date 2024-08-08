import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import {
  AppTable,
  AppTableBody,
  AppTableContainer,
  AppTableHead,
  AppTableNoData,
} from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { useSelector } from "react-redux";

const TableStudentSchedule = () => {
  const { schedules, isFetching } = useSelector(
    (state) => state.scheduleReducer
  );

  useEffect(() => {
    const tableEl = document.getElementById("table");
    const heightWindow = window.innerHeight;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightWindow - tableTop}px`;
  }, []);

  return (
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
            {!isFetching ? (
              schedules
                ?.slice(1)
                ?.map((schedule, index) => (
                  <RowTable key={index} data={schedule} />
                ))
            ) : (
              <AppTableNoData isLoading={isFetching} />
            )}
          </AppTableBody>
        </AppTable>
      </AppTableContainer>
    </Paper>
  );
};

export default TableStudentSchedule;
