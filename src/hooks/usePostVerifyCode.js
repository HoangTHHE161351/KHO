import { AppToastNotify } from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { AuthService, UserService } from "src/services";

const usePostVerifyCode = () => {
  const handleVerifyCode = async (email) => {
    try {
      const response = await AuthService.requestVerifyCodeService({
        email: email,
      });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: response?.data?.data || "Send OTP success!",
        });
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      return;
    }
  };

  const handleResetPassword = async (data) => {
    try {
      const response = await AuthService.requestResetPasswordService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: response?.data || "Reset password success!",
        });
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      return;
    }
  };

  const handleVerifyChangePassword = async () => {
    try {
      const response = await UserService.verifyCodeChangePasswordService();
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: response?.data || "Send verify for your email success!",
        });
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      return;
    }
  }

  const handleChangePassword = async (data) => {
    try {
      const response = await UserService.changePasswordService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Change password success!",
        });
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      return;
    }
  };

  return { handleVerifyCode, handleResetPassword, handleVerifyChangePassword, handleChangePassword };
};

export default usePostVerifyCode;
