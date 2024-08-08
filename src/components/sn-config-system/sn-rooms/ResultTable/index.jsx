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

const ResultTable = ({ data, isFetching }) => {
  useEffect(() => {
    const tableEl = document.getElementById("table-room");
    const modalEl = document.getElementById("modal-customer");
    const heightModal = modalEl.offsetHeight;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightModal - tableTop - 36 - 16}px`;
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
      <AppTableContainer id="table-room">
        <AppTable>
          <AppTableHead>
            <HeaderTable />
          </AppTableHead>
          <AppTableBody>
            {data.length ? (
              data.map((item, index) => (
                <RowTable key={index} data={item} order={index + 1} />
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

export default ResultTable;
