import { AppToastNotify } from 'src/components/Common';
import { ApiConstants, AppConstants, EnvConstants } from 'src/const';
import { AttendanceService } from 'src/services'

const useCheckAttend = () => {
    const handleCheckAttend = async (scheduleId, body, onSuccess) => {
        try {
            if (!scheduleId || !body) throw new Error("An error occurred!")
            const response = await AttendanceService.checkAttendance(scheduleId, body);
            if (response.status === ApiConstants.STT_OK) {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.SUCCESS, message: "Update Attend Success!" })
                onSuccess()
            } else {
                AppToastNotify({
                    type: AppConstants.NOTIFY_TYPE.ERROR,
                    message: "An error occurred!"
                })
            }
        } catch (error) {
            EnvConstants.IS_DEV && console.log(error);
            AppToastNotify({
                type: AppConstants.NOTIFY_TYPE.ERROR,
                message: error?.message || "An error occurred!"
            })
        }
    }

    return handleCheckAttend;
}

export default useCheckAttend