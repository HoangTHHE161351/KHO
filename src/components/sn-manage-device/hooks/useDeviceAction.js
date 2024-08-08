import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  EnvConstants,
} from "src/const";
import { DeviceService } from "src/services";

const useDeviceAction = () => {
  const handleCreateDevice = async (data, onSuccess) => {
    try {
      const response = await DeviceService.createDeviceService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Create device successfully",
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

  const handleUpdateDevice = async (data, onSuccess) => {
    try {
      const response = await DeviceService.editDeviceService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Update device successfully",
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
  }

  const handleDeleteDevice = async (cameraId, onSuccess) => {
    try {
      const response = await DeviceService.deleteDeviceService({ cameraId });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Delete device successfully",
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
  }

  return { handleCreateDevice, handleUpdateDevice, handleDeleteDevice };
};

export default useDeviceAction;
