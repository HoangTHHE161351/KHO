import React, { useEffect, useState } from "react";
import { AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import {
  FilterTable,
  TableManageStudent,
} from "src/components/sn-manage-student";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import { StudentService } from "src/services";

const StudentManager = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [students, setStudent] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [pagination, setPagination] = useState(
    DataConstants.PAGINATION_DEFAULT
  );

  const getStudentList = async (filter, pagination) => {
    setIsFetching(true);
    try {
      const response = await StudentService.getStudentListService({
        ...handleConvertFilter(filter),
        ...pagination,
      });
      if (response.status === ApiConstants.STT_OK) {
        setStudent(response.data.data.content);
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

  useEffect(() => {
    getStudentList(filter, pagination);
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setStudent([]);
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
      <TableManageStudent
        handlePageChange={handlePageChange}
        isFetching={isFetching}
        pagination={pagination}
        totalData={totalData}
        students={students}
      />
    </AppTablePageLayout>
  );
};

export default StudentManager;

export const handleConvertFilter = (filter) => {
  const newFilter = { ...filter };
  if (Object.keys(newFilter).length) {
    for (let key in newFilter) {
      const newValue = newFilter[key];
      switch (key) {
        case "gender":
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

const DEFAULT_FILTER = {
  status: null,
  roleName: null,
  gender: null,
  search: null,
};
