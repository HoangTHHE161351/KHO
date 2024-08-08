import { memo, useEffect } from "react";
import Row from "./Row";
import {
  AppTable,
  AppTableBody,
  AppTableContainer,
  AppTableHead,
  AppTableNoData,
} from "src/components/Common/TableCommon";
import Header from "./Header";
import { Paper } from "@mui/material";

const ResultTableStudentClass = ({ data, isFetching }) => {
  useEffect(() => {
    const tableEl = document.getElementById("table1");
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
      <AppTableContainer id="table1">
        <AppTable>
          <AppTableHead>
            <Header />
          </AppTableHead>
          <AppTableBody>
            {data.length ? (
              data.map((item, index) => (
                <Row key={index} data={item} order={index + 1} />
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

export default memo(ResultTableStudentClass);
