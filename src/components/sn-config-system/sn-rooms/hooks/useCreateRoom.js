import { AppToastNotify } from 'src/components/Common';
import { ApiConstants, AppConstants, EnvConstants } from 'src/const';
import { RoomService } from 'src/services'

const useCreateRoom = () => {
    const handleCreateRoom = async ({ data, onSuccess }) => {
        try {
            const response = await RoomService.createRoom(data);
            if (response.status === ApiConstants.STT_OK) {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.SUCCESS, message: 'Create room success!' })
                onSuccess()
            } else {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: response?.message || 'Create room failed!' })
            }
        } catch (error) {
            EnvConstants.IS_DEV && console.log(error);
            AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: error?.response?.data?.message || 'An error occurred!' })
        }
    }
    return handleCreateRoom;
}

export default useCreateRoom