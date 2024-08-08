import { AppToastNotify } from 'src/components/Common';
import { ApiConstants, AppConstants, EnvConstants } from 'src/const';
import { TimeSlotService } from 'src/services';

const useUpdateTimeSlots = () => {
    const handleUpdateTimeSlots = async ({ data, onSuccess }) => {
        try {
            const { id } = data
            if (!id) throw new Error('Update time slots failed!');
            const response = await TimeSlotService.editTimeSlot(data);
            if (response.status === ApiConstants.STT_OK) {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.SUCCESS, message: 'Update time slots success!' })
                onSuccess()
            } else {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: response?.message || 'Update time slots failed!' })
            }
        } catch (error) {
            EnvConstants.IS_DEV && console.log(error);
            AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: error?.response?.data?.message || 'An error occurred!' })
        }
    }
    return handleUpdateTimeSlots;
}

export default useUpdateTimeSlots