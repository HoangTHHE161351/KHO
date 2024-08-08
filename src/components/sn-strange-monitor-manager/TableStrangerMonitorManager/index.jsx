import React, { useState, useEffect } from "react";
import { AppTableCell, AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { getStrangeListLogs } from "src/services/Strange.service";

const TableStrangeMonitorManager = ({ dateSl, searchKey, roomSelection, roomName, type }) => {
  const [userSl, setUserSl] = useState(null);
  const [strangeListLogs, setStrangeListLogs] = useState([]);
  const [screenState, setScreenState] = useState({
    isLoading: false,
    currentPage: 1,
    pageIndex: 1,
    pageSize: 10,
  });
  const [totalData, setTotalData] = useState(null);

  const getListStrangeLogs = async (params) => {
    setScreenState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await getStrangeListLogs({ params });
      const data = response?.data?.data?.content;
      if (data) {
        setStrangeListLogs(data);
        setTotalData(response?.data?.data?.totalElements);
      }
    } catch (error) {
      console.log("error: ", error);
      //TODO: handle error
    }
    setScreenState((prev) => ({ ...prev, isLoading: false }));
  };

  const handleOnPageChange = (value) => {
    const pagee = value?.page || 1;
    const sizee = value?.size || 10;


    setScreenState((prev) => ({
      ...prev,
      pageSize: sizee || 10,
      currentPage: pagee || 1,

    }));
    const params = {
      search: searchKey,
      roomId: roomSelection,
      date: dateSl,
      type: type,
      page: value?.page || 1,
      size: value?.size || 10,
    };
    console.log("Page+++:", params.page); // Log the page value
    console.log("Size++++:", params.size); // Log the size value
    console.log("Type++++:", params.type); // Log the size value
    getListStrangeLogs(params);
  };

  // Init data
  useEffect(() => {
    const params = {
      search: searchKey,
      roomId: roomSelection,
      date: dateSl,
      type: type,
      page: screenState.currentPage,
      size: screenState.pageSize,
    };
    getListStrangeLogs(params);
  }, [searchKey, dateSl, roomSelection, type]);

  return (
    
    <AppTableLayout
      totalData={totalData}
      header={<HeaderTable />}
      isLoading={screenState.isLoading}
      onPageChange={handleOnPageChange}
      currentPage={screenState.currentPage}
      pageSize={screenState.pageSize}
      pageSizeOptionList={[5, 10, 25, 100]} // Example size options
    >
      {console.log('IsLoading: ', screenState.isLoading)}
      {strangeListLogs && strangeListLogs?.map((item, index) => {
        return (
          <RowTable
            key={item.id}
            index={index}
            userData={item}
            roomName={roomName}
          />
        );
      })}
    </AppTableLayout>
  );
};

export default TableStrangeMonitorManager;
