import React, { memo } from "react";
import {
  AppTable,
  AppTableBody,
  AppTableContainer,
  AppTableHead,
  AppTableNoData,
} from "src/components/Common/TableCommon";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import { Paper } from "@mui/material";

const CheckAttendanceTable = ({ data, onCheckAttend, isFetching }) => {
  console.log("data", data);
  return (
    <Paper
      id="table"
      sx={{
        mx: 3,
        overflow: "hidden",
        boxShadow: "unset",
        position: "relative",
        borderRadius: "10px 10px 0 0",
      }}
    >
      <AppTableContainer className="custom-scrollbar" sx={{ height: 450 }}>
        <AppTable>
          <AppTableHead>
            <HeaderTable />
          </AppTableHead>
          <AppTableBody>
            {data?.length ? (
              data.map((item, index) => (
                <RowTable
                  key={index}
                  data={item}
                  order={index}
                  onCheckAttend={onCheckAttend}
                />
              ))
            ) : isFetching ? (
              <AppTableNoData title="Loading data!" />
            ) : (
              <AppTableNoData />
            )}
          </AppTableBody>
        </AppTable>
      </AppTableContainer>
    </Paper>
  );
};

export default memo(CheckAttendanceTable);
