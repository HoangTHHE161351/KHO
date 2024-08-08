import { useDispatch } from "react-redux";
import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import { teacherActions } from "src/redux-store/store";
import { TeacherService } from "src/services";

const usePostTeacher = () => {
  const dispatch = useDispatch();

//   const handleCreateUser = async (data) => {
//     try {
//       const response = await UserService.createUserService(data);
//       if (response.status === ApiConstants.STT_OK) {
//         AppToastNotify({
//           type: AppConstants.NOTIFY_TYPE.SUCCESS,
//           message: "Create User Success!",
//         });
//         dispatch({ type: userActions.getUserList.type });
//         return response.data;
//       } else {
//         AppToastNotify({
//           type: AppConstants.NOTIFY_TYPE.ERROR,
//           message: response?.message || "An error occurred!",
//         });
//         dispatch(userActions.stopLoading());
//         return;
//       }
//     } catch (error) {
//       EnvConstants.IS_DEV && console.log(error);
//       AppToastNotify({
//         type: AppConstants.NOTIFY_TYPE.ERROR,
//         message: error?.response?.data?.message || "An error occurred!",
//       });
//       dispatch(userActions.stopLoading());
//       return;
//     }
//   };


  const handleChangeStatus = async (data) => {
    try {
      const { id, status, onSuccess } = data;
      const response = await TeacherService.changeStatusTeacherService({
        id,
        status,
      });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Change Status Teacher Success!",
        });
        onSuccess();
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

  const handleEditTeacher = async (data) => {
    try {
      const response = await TeacherService.editTeacherService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Edit User Success!",
        });
        dispatch(teacherActions.getTeacherList(DataConstants.PAGINATION_DEFAULT));
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        dispatch(teacherActions.stopLoading());
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      dispatch(teacherActions.stopLoading());
      return;
    }
  };

//   const handleImportUser = async (data) => {
//     try {
//       const response = await UserService.importUserService(data);
//       if (response.status === ApiConstants.STT_OK) {
//         AppToastNotify({
//           type: AppConstants.NOTIFY_TYPE.SUCCESS,
//           message: "Import User Success!",
//         });
//         dispatch(userActions.getUserList(DataConstants.PAGINATION_DEFAULT));
//         return response.data.data;
//       } else {
//         AppToastNotify({
//           type: AppConstants.NOTIFY_TYPE.ERROR,
//           message: response?.message || "An error occurred!",
//         });
//         dispatch(userActions.stopLoading());
//         return;
//       }
//     } catch (error) {
//       EnvConstants.IS_DEV && console.log(error);
//       AppToastNotify({
//         type: AppConstants.NOTIFY_TYPE.ERROR,
//         message: error?.response?.data?.message || "An error occurred!",
//       });
//       dispatch(userActions.stopLoading());
//       return;
//     }
//   };

  const handleSetNewPassword = async (data) => {
    try {
      const queryParams = new URLSearchParams({ userName: data.userName, newPass: data.newPass }).toString();
      const response = await TeacherService.setNewPasswordService(queryParams);

      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Set New Password Success!",
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

  return {
    // handleCreateUser,
    // handleActiveUser,
    handleChangeStatus,
    handleEditTeacher,
    // handleImportUser,
    handleSetNewPassword
  };
};

export default usePostTeacher;
