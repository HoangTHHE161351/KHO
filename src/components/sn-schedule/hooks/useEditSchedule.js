import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppToastNotify } from "src/components/Common";
import { AppConstants, EnvConstants } from "src/const";
import { scheduleActions } from "src/redux-store/store";
import { ScheduleService } from "src/services";

const useEditSchedule = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.scheduleReducer.filter);

  const handleEditSchedule = async (data) => {
    try {
      const response = await ScheduleService.editSchedule(data);
      if (response.status === 200) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Update Subject Success!",
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

  return handleEditSchedule;
};

export default useEditSchedule;
