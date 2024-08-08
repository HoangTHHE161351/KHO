import React, { memo } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "../TableHardDisk/HeaderTable";
import RowTable from "./RowTable";

const TableHardDisk = ({ hardDisks, isFetching }) => {
  return (
    <AppTableLayout
      header={<HeaderTable />}
      totalData={hardDisks?.length}
      isLoading={isFetching}
    >
      {hardDisks?.map((row, index) => (
        <RowTable order={index + 1} row={row} />
      ))}
    </AppTableLayout>
  );
};

export default memo(TableHardDisk);
