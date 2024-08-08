import { AppToastNotify } from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { DeviceService } from "src/services";

const useLoginDevice = () => {
  const handleLoginDevice = async (data, onSuccess) => {
    try {
      const response = await DeviceService.loginHardDiskService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Login device successfully",
        });
        onSuccess();
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
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

  return handleLoginDevice;
};

export default useLoginDevice;
