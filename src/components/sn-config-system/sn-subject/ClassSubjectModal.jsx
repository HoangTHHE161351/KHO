import { useEffect, useState } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import ClassSubjectTable from "src/components/sn-config-system/sn-subject/ClassSubjectTable";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { ClassSubjectService } from "src/services";

const ClassSubjectModal = ({ open, onClose, data }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [resultData, setResultData] = useState([]);

  const getClassSubject = async (subjectId) => {
    setIsFetching(true);
    try {
      const response = await ClassSubjectService.getClassSubject({
        subjectId,
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
      getClassSubject(data?.id);
    }
  }, [data?.id]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      fullScreen
      modalTitleProps={{
        title: "Class Subject",
      }}
      modalContentProps={{
        content: (
          <ClassSubjectTable
            data={resultData}
            isFetching={isFetching}
            reloadApi={() => getClassSubject(data?.id)}
            subjectDetail={data}
          />
        ),
      }}
    />
  );
};

export default ClassSubjectModal;
