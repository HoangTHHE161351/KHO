import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  EnvConstants,
} from "src/const";
import { CurriculumService } from "src/services";

const useUpdateCurriculum = () => {
  const handleUpdateCurriculum = async ({ data, onSuccess }) => {
    try {
      const { id } = data;
      if (!id) throw new Error("Update curriculum failure!");
      const response = await CurriculumService.editCurriculum(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Update curriculum success!",
        });
        onSuccess()
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "Update curriculum failure!",
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

  return handleUpdateCurriculum;
};

export default useUpdateCurriculum;
