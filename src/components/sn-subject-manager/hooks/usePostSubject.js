import { useDispatch } from "react-redux";
import { AppToastNotify } from "src/components/Common";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import { subjectActions } from "src/redux-store/store";
import { SubjectService } from "src/services";

const usePostSubject = () => {
  const dispatch = useDispatch();

  const handleCreateSubject = async (data) => {
    try {
      const response = await SubjectService.createSubjectService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Create Subject Success!",
        });
        dispatch({ type: subjectActions.getSubjectList.type });
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        dispatch(subjectActions.stopLoading());
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      dispatch(subjectActions.stopLoading());
      return;
    }
  };

  const handleActiveSubject = async (data, onSuccess) => {
    try {
      const response = await SubjectService.activeSubjectService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Active Subject Success!",
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

  const handleChangeStatus = async (data) => {
    try {
      const { id, status, onSuccess } = data;
      const response = await SubjectService.changeStatusSubjectService({
        id,
        status,
      });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Change Status Subject Success!",
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

  const handleEditSubject = async (data) => {
    try {
      const response = await SubjectService.editSubjectService(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Edit Subject Success!",
        });
        dispatch(
          subjectActions.getSubjectList(DataConstants.PAGINATION_DEFAULT)
        );
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        dispatch(subjectActions.stopLoading());
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
      dispatch(subjectActions.stopLoading());
      return;
    }
  };

  return {
    handleCreateSubject,
    handleActiveSubject,
    handleChangeStatus,
    handleEditSubject,
  };
};

export default usePostSubject;
