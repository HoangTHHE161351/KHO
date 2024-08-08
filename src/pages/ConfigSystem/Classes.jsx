import React, { useCallback, useEffect } from "react";
import { AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import ClassTable from "src/components/sn-config-system/sn-classes/ClassTable";
import HeaderPageTable from "src/components/sn-config-system/sn-classes/HeaderPageTable";
import { AppConstants, DataConstants, EnvConstants } from "src/const";
import { ClassService } from "src/services";

const Classes = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [filter, setFilter] = React.useState({
    status: AppConstants.VALUE_SELECT_ALL,
  });
  const [pagination, setPagination] = React.useState(
    DataConstants.PAGINATION_DEFAULT
  );
  const [classes, setClasses] = React.useState([]);
  const [totalData, setTotalData] = React.useState(0);

  const getClassesAsync = async ({ filterClass, paginationClasses }) => {
    setIsFetching(true);
    try {
      const response = await ClassService.getClassesList({
        ...handleConvertFilter(filterClass),
        ...paginationClasses,
      });

      if (response.status === 200) {
        setClasses(response.data.data.content);
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
    getClassesAsync({ filterClass: filter, paginationClasses: pagination });
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setFilter({});
      setPagination(DataConstants.PAGINATION_DEFAULT);
      setClasses([]);
      setTotalData(0);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderPageTable
          handleChangeFilterWithKey={handleChangeFilterWithKey}
          data={classes}
          filter={filter}
          onSuccess={() =>
            getClassesAsync({
              filterClass: filter,
              paginationClasses: DataConstants.PAGINATION_DEFAULT,
            })
          }
        />
      }
    >
      <ClassTable
        classes={classes}
        handleChangePage={handlePageChange}
        isFetching={isFetching}
        pagination={pagination}
        totalData={totalData}
        onSuccess={() =>
          getClassesAsync({
            filterClass: filter,
            paginationClasses: DataConstants.PAGINATION_DEFAULT,
          })
        }
      />
    </AppTablePageLayout>
  );
};

export default Classes;

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
