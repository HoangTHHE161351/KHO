import { AppToastNotify } from 'src/components/Common';
import { ApiConstants, AppConstants, EnvConstants } from 'src/const';
import { TimeSlotService } from 'src/services'

const useCreateTimeSlots = () => {
    const handleCreateTimeSlots = async ({ data, onSuccess }) => {
        try {
            const response = await TimeSlotService.createTimeSlot(data);
            if (response.status === ApiConstants.STT_OK) {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.SUCCESS, message: 'Create time slots success!' })
                onSuccess()
            } else {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: response?.message || 'Create time slots failed!' })
            }
        } catch (error) {
            EnvConstants.IS_DEV && console.log(error);
            AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: error?.response?.data?.message || 'An error occurred!' })
        }
    }
    return handleCreateTimeSlots;
}

export default useCreateTimeSlots