import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  EnvConstants,
} from "src/const";
import { CurriculumService } from "src/services";

const useDeleteCurriculum = () => {
  const handleDeleteCurriculum = async ({ id, onSuccess }) => {
    try {
      if (!id) throw new Error("Delete curriculum failure!");
      const response = await CurriculumService.deleteCurriculum(id);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Delete curriculum success!",
        });
        onSuccess();
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "Delete curriculum failure!",
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

  return handleDeleteCurriculum;
};

export default useDeleteCurriculum;
