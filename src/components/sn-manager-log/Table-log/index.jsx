import React, { useEffect, useState } from "react";
import { AppTableLayout } from "src/components/Common/TableCommon";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import LogDetailModal from "../LogDetailModal";
import { getRoomLogs } from "src/services/Room.service";

const HistoryLogTableManager = ({
  dateSl,
  searchKey,
  roomSelection,
  roomName,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userSl, setUserSl] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [screenState, setScreenState] = useState({
    isLoading: false,
    currentPage: 1,
    pageIndex: 1,
    pageSize: 10,
  });

    // Init data
  // useEffect(() => {
  //   setScreenState((prev) => ({ ...prev, isLoading: true }));
  //   const params = {
  //     search: searchKey,
  //     roomId: roomSelection,
  //     date: dateSl,
  //     page: screenState.currentPage,
  //     size: screenState.pageSize,
  //   };
  //   getListRoomLogs(params);
  //   setScreenState((prev) => ({ ...prev, isLoading: false }));
  // }, []);

  const getListRoomLogs = async (params) => {
    try {
      setScreenState((prev) => ({ ...prev, isLoading: true }));
      const response = await getRoomLogs({ params });
      const data = response?.data?.data;
      console.log("=================" + dateSl)
      if (data) {
        setHistoryLogs(data); 
      }
    } catch (error) {
      console.log("error: ", error);
      //TODO: handle error
    }
    setScreenState((prev) => ({ ...prev, isLoading: false }));
  };

  const toggleModalVisible = () => {
    setModalVisible((prev) => !prev);
  };

  const handleSelectUser = (data) => {
    console.log('data', data)
    setUserSl(data);
    toggleModalVisible();
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
      page: value?.page || 1,
      size: value?.size || 10,
    };
    console.log("Page+++:", params.page); // Log the page value
    console.log("Size++++:", params.size); // Log the size value
    
    getListRoomLogs(params);
  };

  // Init data
  useEffect(() => {
    // setScreenState((prev) => ({ ...prev, isLoading: true }));
    // console.log('Room Selected 11: ', roomSelection);
    const params = {
      search: searchKey,
      roomId: roomSelection,
      date: dateSl,
      page: screenState.currentPage,
      size: screenState.pageSize,
    };
    console.log("======", params.date)
    getListRoomLogs(params);
    // setScreenState((prev) => ({ ...prev, isLoading: false }));
  }, [searchKey, dateSl, roomSelection]);

  useEffect(() => {
    console.log('userSL', userSl)
  }, [userSl])

  return (
    <>
      <AppTableLayout
        totalData={historyLogs?.totalElements}
        header={<HeaderTable />}
        isLoading={screenState.isLoading}
        onPageChange={handleOnPageChange}
        currentPage={screenState.currentPage}
        pageSize={screenState.pageSize}
        pageSizeOptionList={[10, 25, 100]} // Example size options
      >
        {historyLogs?.content?.map((item, index) => {
          return (
            <RowTable
              key={item.id}
              index={index}
              userData={item}
              handleSelectUser={handleSelectUser}
            />
          );
        })}
      </AppTableLayout>
      {
        modalVisible && <LogDetailModal
        isVisible={modalVisible}
        onCloseModal={toggleModalVisible}
        date={dateSl}
        dataView={userSl}
        userData={userSl}
      />
      }
      
    </>
  );
};

export default HistoryLogTableManager;
