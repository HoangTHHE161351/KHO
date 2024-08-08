import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import {
  FilterTable,
  TableSubjectManager,
} from "src/components/sn-subject-manager";
import { subjectActions } from "src/redux-store/store";

const SubjectManager = () => {
  const dispatch = useDispatch();
  const { filter, pagination } = useSelector((state) => state.subjectReducer);

  useEffect(() => {
    dispatch(subjectActions.getSubjectList({ ...filter, ...pagination }));
  }, [dispatch, filter, pagination]);

  useEffect(() => {
    return () => {
      dispatch(subjectActions.subjectReset());
    };
  }, [dispatch]);

  return (
    <AppTablePageLayout headerFilter={<FilterTable />}>
      <TableSubjectManager />
    </AppTablePageLayout>
  );
};

export default SubjectManager;
