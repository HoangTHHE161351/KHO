import React, { useEffect } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import { AppConstants, EnvConstants } from "src/const";
import { CurriculumService } from "src/services";
import SubjectCurriculumTable from "./SubjectCurriculumTable";

const SubjectCurriculumModal = ({ open, onClose, data }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [resultData, setResultData] = React.useState([]);

  const getCurriculumSubject = async (curriculumId) => {
    setIsFetching(true);
    try {
      const response = await CurriculumService.getCurriculumSubjects({
        curriculumId: curriculumId,
      });
      if (response.status === 200) {
        setResultData(response.data.data);
      } else {
        throw new Error(response?.data?.message || "An error occurred");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error.message ||
          "An error occurred",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (data?.id && open) {
      getCurriculumSubject(data?.id);
    }
  }, [data?.id, open]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      fullScreen
      modalTitleProps={{
        title: "Subject Curriculum",
      }}
      modalContentProps={{
        content: (
          <SubjectCurriculumTable
            data={resultData}
            isFetching={isFetching}
            curriculumDetail={data}
            reloadApi={() => getCurriculumSubject(data.id)}
          />
        ),
      }}
    />
  );
};

export default SubjectCurriculumModal;
