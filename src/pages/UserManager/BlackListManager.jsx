import React, { useEffect, useState } from "react";
import { AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import { FilterTable, TableUserManager } from "src/components/sn-user-manager";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import { UserService } from "src/services";

const BlackListManager = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [pagination, setPagination] = useState(
    DataConstants.PAGINATION_DEFAULT
  );

  const getUserList = async (filter, pagination) => {
    setIsFetching(true);
    try {
      const response = await UserService.getUserBlackListService({
        ...filter,
        ...pagination,
      });
      if (response.status === ApiConstants.STT_OK) {
        setUsers(response.data.data.content);
        setTotalData(response.data.data.totalElements);
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response.data.response || "An error occurred",
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

  const changeFilterWithKey = (key) => (value) => {
    setFilter({ ...filter, [key]: value });
    setPagination(DataConstants.PAGINATION_DEFAULT);
  };

  const handlePageChange = (pagination) => {
    setPagination(pagination);
  };

  const handleChangeStatusSuccess = (id) => {
    const newUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          status:
            user.status === DataConstants.STATUS_TYPE.ACTIVE
              ? DataConstants.STATUS_TYPE.INACTIVE
              : DataConstants.STATUS_TYPE.ACTIVE,
        };
      }
      return user;
    });
    setUsers(newUsers);
  };

  useEffect(() => {
    getUserList(filter, pagination);
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setUsers([]);
      setTotalData(0);
      setFilter(DEFAULT_FILTER);
      setPagination(DataConstants.PAGINATION_DEFAULT);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <FilterTable
          handleChangeFilterWithKey={changeFilterWithKey}
          filter={filter}
        />
      }
    >
      <TableUserManager
        handleChangeStatusSuccess={handleChangeStatusSuccess}
        handlePageChange={handlePageChange}
        isFetching={isFetching}
        pagination={pagination}
        totalData={totalData}
        users={users}
        isView={true}
      />
    </AppTablePageLayout>
  );
};

export default BlackListManager;

const DEFAULT_FILTER = {
  status: null,
  roleName: null,
  gender: null,
  search: null,
};
