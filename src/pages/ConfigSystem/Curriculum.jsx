import React, { useCallback, useEffect } from "react";
import { AppToastNotify } from "src/components/Common";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import CurriculumTable from "src/components/sn-config-system/sn-curriculum/CurriculumTable";
import HeaderTablePage from "src/components/sn-config-system/sn-curriculum/HeaderTablePage";
import { AppConstants, DataConstants, EnvConstants } from "src/const";
import { CurriculumService } from "src/services";

const Curriculum = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [filter, setFilter] = React.useState({
    status: AppConstants.VALUE_SELECT_ALL,
  });
  const [pagination, setPagination] = React.useState(
    DataConstants.PAGINATION_DEFAULT
  );
  const [curriculums, setCurriculums] = React.useState([]);
  const [totalData, setTotalData] = React.useState(0);

  const getCurriculumAsync = async ({
    filterCurriculum,
    paginationCurriculum,
  }) => {
    setIsFetching(true);
    try {
      const response = await CurriculumService.getCurriculumList({
        ...handleConvertFilter(filterCurriculum),
        ...paginationCurriculum,
      });

      if (response.status === 200) {
        setCurriculums(response.data.data.content);
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
    getCurriculumAsync({
      filterCurriculum: filter,
      paginationCurriculum: pagination,
    });
  }, [filter, pagination]);

  useEffect(() => {
    return () => {
      setFilter({});
      setPagination(DataConstants.PAGINATION_DEFAULT);
      setCurriculums([]);
      setTotalData(0);
    };
  }, []);

  return (
    <AppTablePageLayout
      headerFilter={
        <HeaderTablePage
          filter={filter}
          data={curriculums}
          handleChangeFilterWithKey={handleChangeFilterWithKey}
          onSuccess={() =>
            getCurriculumAsync({
              filterCurriculum: filter,
              paginationCurriculum: DataConstants.PAGINATION_DEFAULT,
            })
          }
        />
      }
    >
      <CurriculumTable
        curriculums={curriculums}
        handleChangePage={handlePageChange}
        isFetching={isFetching}
        onSuccess={() =>
          getCurriculumAsync({
            filterCurriculum: filter,
            paginationCurriculum: DataConstants.PAGINATION_DEFAULT,
          })
        }
        pagination={pagination}
        totalData={totalData}
      />
    </AppTablePageLayout>
  );
};

export default Curriculum;

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
