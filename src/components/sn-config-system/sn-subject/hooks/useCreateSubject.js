import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  EnvConstants,
} from "src/const";
import { SubjectService } from "src/services";

const useCreateSubject = () => {
  const handleCreateSubject = async ({ data, onSuccess }) => {
    try {
      const response = await SubjectService.createSubjectService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Create Subject success!",
        });
        onSuccess()
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "Create Subject failed!",
        });
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    }
  };
  return handleCreateSubject;
};

export default useCreateSubject;
