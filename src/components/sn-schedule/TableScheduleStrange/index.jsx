import React from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";

const TableScheduleStrange = ({
  data,
  pagination,
  isFetching,
  totalData,
  handlePageChange,
}) => {
  return (
    <AppTableLayout
      header={<HeaderTable />}
      totalData={totalData}
      currentPage={pagination.page}
      isLoading={isFetching}
      pageSize={pagination.size}
      onPageChange={handlePageChange}
      sx={{
        height: 450,
      }}
    >
      {data.map((row, index) => {
        const order = (pagination.page - 1) * pagination.size + (index + 1);
        return <RowTable data={row} order={order} key={order} />;
      })}
    </AppTableLayout>
  );
};

export default TableScheduleStrange;
