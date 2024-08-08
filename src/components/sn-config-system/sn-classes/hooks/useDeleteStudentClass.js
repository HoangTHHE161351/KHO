import { AppToastNotify } from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { StudentClassService } from "src/services";

const useDeleteStudentClass = () => {
  const handleDeleteStudentClass = async ({ id, onSuccess }) => {
    try {
      const response = await StudentClassService.deleteStudentClassService({
        id,
      });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Delete student class successfully!",
        });
        onSuccess?.();
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
    }
  };

  return handleDeleteStudentClass;
};

export default useDeleteStudentClass;
