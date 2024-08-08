import React, { useCallback, useEffect } from "react";
import { AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import {
  HeaderTablePage,
  SemesterTable,
} from "src/components/sn-config-system/sn-semester";
import { AppConstants, DataConstants, EnvConstants } from "src/const";
import { SemesterService } from "src/services";

const Semester = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [filter, setFilter] = React.useState({
    status: AppConstants.VALUE_SELECT_ALL,
  });
  const [pagination, setPagination] = React.useState(
    DataConstants.PAGINATION_DEFAULT
  );
  const [semesters, setSemesters] = React.useState([]);
  const [totalData, setTotalData] = React.useState(0);

  const getSemesterAsync = async ({ filterSemester, paginationSemester }) => {
    setIsFetching(true);
    try {
      const response = await SemesterService.getSemester({
        ...handleConvertFilter(filterSemester),
        ...paginationSemester,
      });

      if (response.status === 200) {
        setSemesters(response.data.data.content);
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
    getSemesterAsync({
      filterSemester: filter,
      paginationSemester: pagination,
    });
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setFilter({});
      setPagination(DataConstants.PAGINATION_DEFAULT);
      setSemesters([]);
      setTotalData(0);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderTablePage
          filter={filter}
          data={semesters}
          handleChangeFilterWithKey={handleChangeFilterWithKey}
          onSuccess={() =>
            getSemesterAsync({
              filterSemester: filter,
              paginationSemester: DataConstants.PAGINATION_DEFAULT,
            })
          }
        />
      }
    >
      <SemesterTable
        onSuccess={() =>
          getSemesterAsync({
            filterSemester: filter,
            paginationSemester: DataConstants.PAGINATION_DEFAULT,
          })
        }
        handleChangePage={handlePageChange}
        isFetching={isFetching}
        pagination={pagination}
        semesters={semesters}
        totalData={totalData}
      />
    </AppTablePageLayout>
  );
};

export default Semester;

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
