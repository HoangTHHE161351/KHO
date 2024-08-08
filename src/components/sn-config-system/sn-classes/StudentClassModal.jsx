import React, { useEffect, useState } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import StudentClassTable from "./StudentClassTable";
import { StudentClassService } from "src/services";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";

const StudentClassModal = ({ open, onClose, data }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [resultData, setResultData] = useState([]);

  const getStudentClass = async (classId) => {
    setIsFetching(true);
    try {
      const response = await StudentClassService.getStudentClassService({
        classId,
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
      getStudentClass(data?.id);
    }
  }, [data?.id]);

  return (
    <>
      <AppModal
        open={open}
        onClose={onClose}
        fullScreen
        modalTitleProps={{
          title: "Student Class",
        }}
        modalContentProps={{
          content: (
            <StudentClassTable
              data={resultData}
              isFetching={isFetching}
              reloadApi={() => getStudentClass(data?.id)}
              classDetail={data}
            />
          ),
        }}
      />
    </>
  );
};

export default StudentClassModal;
