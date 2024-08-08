import React, { useCallback, useEffect } from "react";
import { AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import HeaderPageTable from "src/components/sn-config-system/sn-rooms/HeaderPageTable";
import RoomTable from "src/components/sn-config-system/sn-rooms/RoomTable";
import { AppConstants, DataConstants, EnvConstants } from "src/const";
import { RoomService } from "src/services";

const Room = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [filter, setFilter] = React.useState({
    status: AppConstants.VALUE_SELECT_ALL,
  });
  const [pagination, setPagination] = React.useState(
    DataConstants.PAGINATION_DEFAULT
  );
  const [rooms, setRooms] = React.useState([]);
  const [totalData, setTotalData] = React.useState(0);

  const getRoomsAsync = async ({ filterRoom, paginationRoom }) => {
    setIsFetching(true);
    try {
      const response = await RoomService.getRoomList({
        ...handleConvertFilter(filterRoom),
        ...paginationRoom,
      });

      if (response.status === 200) {
        setRooms(response.data.data.content);
        setTotalData(response.data.data.totalElements);
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response.data?.response || "An error occurred",
        });
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.error(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.response || "An error occurred",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleChangeFilterWithKey = useCallback(
    (key) => (value) => {
      setFilter((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handlePageChange = useCallback((page) => {
    setPagination(page);
  }, []);

  useEffect(() => {
    getRoomsAsync({ filterRoom: filter, paginationRoom: pagination });
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setFilter({});
      setPagination(DataConstants.PAGINATION_DEFAULT);
      setRooms([]);
      setTotalData(0);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderPageTable
          handleChangeFilterWithKey={handleChangeFilterWithKey}
          filter={filter}
          data={rooms}
          onSuccess={() =>
            getRoomsAsync({
              filterRoom: filter,
              paginationRoom: DataConstants.PAGINATION_DEFAULT,
            })
          }
        />
      }
    >
      <RoomTable
        handleChangePage={handlePageChange}
        isFetching={isFetching}
        pagination={pagination}
        rooms={rooms}
        totalData={totalData}
        onSuccess={() =>
          getRoomsAsync({
            filterRoom: filter,
            paginationRoom: DataConstants.PAGINATION_DEFAULT,
          })
        }
      />
    </AppTablePageLayout>
  );
};

export default Room;

export const handleConvertFilter = (filter) => {
  const newFilter = { ...filter };
  if (Object.keys(newFilter).length) {
    for (let key in newFilter) {
      const newValue = newFilter[key];
      switch (key) {
        case "status":
          if (newValue === AppConstants.VALUE_SELECT_ALL) {
            newFilter[key] = undefined;
          } else {
            newFilter[key] = newValue;
          }
          break;

        case "search":
          newFilter[key] = newFilter.search || null;
          break;
        default:
          break;
      }
    }
  }
  return newFilter;
};
