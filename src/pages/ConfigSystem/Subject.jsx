import React, { useCallback, useEffect } from "react";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import SubjectTable from "src/components/sn-config-system/sn-subject/SubjectTable";
import HeaderPageTable from "src/components/sn-config-system/sn-subject/HeaderPageTable";
import { AppConstants, DataConstants, EnvConstants } from "src/const";
import { SubjectService } from "src/services";
import { AppToastNotify } from "src/components/Common";

const Subject = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [filter, setFilter] = React.useState({
    status: AppConstants.VALUE_SELECT_ALL,
  });
  const [pagination, setPagination] = React.useState(
    DataConstants.PAGINATION_DEFAULT
  );
  const [subjects, setSubjects] = React.useState([]);
  const [totalData, setTotalData] = React.useState(0);

  const getSubjectAsync = async ({ filterSubject, paginationSubject }) => {
    setIsFetching(true);
    try {
      const response = await SubjectService.getSubjectListService({
        // ...filterSubject,
        // search: filterSubject.search || null,
        ...handleConvertFilter(filterSubject),
        ...paginationSubject,
      });

      if (response.status === 200) {
        setSubjects(response.data.data.content);
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
    getSubjectAsync({
      filterSubject: filter,
      paginationSubject: pagination,
    });
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setFilter({});
      setPagination(DataConstants.PAGINATION_DEFAULT);
      setSubjects([]);
      setTotalData(0);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderPageTable
          filter={filter}
          data={subjects}
          handleChangeFilterWithKey={handleChangeFilterWithKey}
          onSuccess={() =>
            getSubjectAsync({
              filterSubject: filter,
              paginationSubject: DataConstants.PAGINATION_DEFAULT,
            })
          }
        />
      }
    >
      <SubjectTable
        onSuccess={() =>
          getSubjectAsync({
            filterSubject: filter,
            paginationSubject: DataConstants.PAGINATION_DEFAULT,
          })
        }
        handleChangePage={handlePageChange}
        isFetching={isFetching}
        pagination={pagination}
        subjects={subjects}
        totalData={totalData}
      />
    </AppTablePageLayout>
  );
};

export default Subject;

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
