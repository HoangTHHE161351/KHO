import React, { useEffect, useState } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import TeacherSubjectTable from "src/components/sn-teacher-manager/TeacherSubjectTable";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { TeacherService } from "src/services";

const TeacherSubjectModal = ({ open, onClose, data }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [resultData, setResultData] = useState([]);

  const getTeacherSubject = async (id) => {
    setIsFetching(true);
    try {
      const response = await TeacherService.getTeacherSubjectList({
        id,
      });

      if (response.status === ApiConstants.STT_OK) {
        setResultData(response.data?.data);
      } else {
        throw new Error(response.data?.message || "An error occurred!");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (data?.id) {
      getTeacherSubject(data?.id);
    }
  }, [data?.id]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      fullScreen
      modalTitleProps={{
        title: "Teacher Subject",
      }}
      modalContentProps={{
        content: (
          <TeacherSubjectTable
            data={resultData}
            isFetching={isFetching}
            reloadApi={() => getTeacherSubject(data?.id)}
            teacherDetail={data}
          />
        ),
      }}
    />
  );
};

export default TeacherSubjectModal;
