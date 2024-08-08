import React, { useState, useEffect, useCallback, memo } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import SubjectManageEditModal from "../SubjectManageEditModal";

const TableSubjectManager = () => {
  const [open, setOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  // const { subjectList, isFetching, totalData, pagination } = useSelector(
  //   (state) => state.subjectReducer
  // );

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [subjectList, setSubjectList] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const getDataList = useCallback(() => {
    setIsFetching(true);
    fetch(
      `http://localhost:8080/api/v1/subject/search-subject?page=${page}&size=${size}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data subject:", data);
        if (data.code === 200) {
          setSubjectList(data.data.content);
          setTotalData(data.data.totalElements);
        } else {
          // Handle the case where data is not as expected
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
        setIsFetching(false);
      });
  }, [page, size]);

  useEffect(() => {
    getDataList();
  }, [page, size, getDataList]);

  return (
    <>
      <AppTableLayout
        totalData={totalData}
        header={<HeaderTable />}
        isLoading={isFetching}
      >
        {subjectList.map((row, index) => {
          const order = (page - 1) * size + index + 1;
          return (
            <RowTable
              key={row.id}
              data={row}
              index={order}
              onOpenEdit={() => {
                setRowSelected(row);
                setOpen(true);
              }}
            />
          );
        })}
      </AppTableLayout>
      <SubjectManageEditModal
        data={rowSelected}
        open={open}
        onClose={() => {
          setRowSelected(null);
          setOpen(false);
        }}
      />
    </>
  );
};

export default memo(TableSubjectManager);
