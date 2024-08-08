import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppToastNotify } from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { scheduleActions } from "src/redux-store/store";
import { ScheduleService } from "src/services";

const useDeleteSchedule = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.scheduleReducer.filter);
  const handleDeleteSchedule = async (id) => {
    try {
      if (!id) throw new Error("An error occurred!");
      const response = await ScheduleService.deleteSchedule({ id });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Delete schedule successfully",
        });
        dispatch(
          scheduleActions.getScheduleList({
            date: dayjs(filter.date).format(AppConstants.DATE_FORMAT), // Ensure correct format
          })
        );
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

  return handleDeleteSchedule;
};

export default useDeleteSchedule;
