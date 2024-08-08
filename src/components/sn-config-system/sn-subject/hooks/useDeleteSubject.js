import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  EnvConstants,
} from "src/const";
import { SubjectService } from "src/services";

const useDeleteSubject = () => {
  const handleDeleteSubject = async ({ id, onSuccess }) => {
    try {
      const response = await SubjectService.deleteSubjectService({ id });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Delete Subject success!",
        });
        onSuccess()
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "Delete Subject failed!",
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
  return handleDeleteSubject;
};

export default useDeleteSubject;
