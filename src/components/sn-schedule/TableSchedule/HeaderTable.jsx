import React, { memo } from "react";
import { AppHeaderCell } from "src/components/Common/TableCommon";

const HeaderTable = ({ HeaderCell }) => {
  return (
    <>
      {HeaderCell?.map((column, index) => {
        return (
          <AppHeaderCell key={index} align={"left"}>
            {column}
          </AppHeaderCell>
        );
      })}
    </>
  );
};

export default memo(HeaderTable);
