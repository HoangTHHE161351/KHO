import { AppToastNotify } from 'src/components/Common';
import { ApiConstants, AppConstants, EnvConstants } from 'src/const';
import { TimeSlotService } from 'src/services';

const useDeleteTimeSlots = () => {
    const handleDeleteTimeSlots = async ({ id, onSuccess }) => {
        try {
            const response = await TimeSlotService.deleteTimeSlot(id);
            if (response.status === ApiConstants.STT_OK) {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.SUCCESS, message: 'Delete time slots success!' });
                onSuccess();
            } else {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: response?.message || 'Delete time slots failed!' })
            }
        } catch (error) {
            EnvConstants.IS_DEV && console.log(error);
            AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: error?.response?.data?.message || 'An error occurred!' })
        }
    }
    return handleDeleteTimeSlots;
}

export default useDeleteTimeSlots