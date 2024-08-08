import { Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import AppTableContainer from "./AppTableContainer";
import AppTable from "./AppTable";
import AppTableHead from "./AppTableHead";
import AppTableBody from "./AppTableBody";
import AppTableNoData from "./AppTableNoData";
import AppPagination from "../AppPagination";

const AppTableLayout = ({
  children,
  totalData,
  isLoading,
  header,
  currentPage,
  pageSize,
  pageSizeOptionList,
  onPageChange,
  tableProps,
  tableHeadProps,
  tableBodyProps,
  paperProps,
  ...otherProps
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const tableEl = document.getElementById("table");
    const heightWindow = window.innerHeight;
    const paginationHeight = ref?.current?.getBoundingClientRect()?.height || 0;
    const tableTop = tableEl.getBoundingClientRect().top;
    tableEl.style.height = `${heightWindow - tableTop - paginationHeight}px`;
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
          ...paperProps?.sx,
        }}
        {...paperProps}
      >
        <AppTableContainer id="table" {...otherProps}>
          <AppTable {...tableProps}>
            <AppTableHead {...tableHeadProps}>{header}</AppTableHead>
            <AppTableBody {...tableBodyProps}>
              {totalData && !isLoading ? (
                children
              ) : (
                <AppTableNoData isLoading={isLoading} />
              )}
            </AppTableBody>
          </AppTable>
        </AppTableContainer>
      </Paper>
      {currentPage && pageSize && (
        <AppPagination
          ref={ref}
          id="pagination"
          onPageChange={onPageChange}
          totalData={totalData}
          currentPage={currentPage}
          pageSize={pageSize}
          pageSizeOptionList={pageSizeOptionList}
        />
      )}
    </>
  );
};

export default AppTableLayout;
