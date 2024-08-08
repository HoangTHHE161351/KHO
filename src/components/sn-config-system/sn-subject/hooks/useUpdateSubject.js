import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  EnvConstants,
} from "src/const";
import { SubjectService } from "src/services";

const useUpdateSubject = () => {
  const handleUpdateSubject = async ({ data, onSuccess }) => {
    try {
      if (!data.id) throw new Error("Update Subject failed!");
      const response = await SubjectService.editSubjectService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Update Subject success!",
        });
        onSuccess()
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "Update Subject failed!",
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
  return handleUpdateSubject;
};

export default useUpdateSubject;
