import { AppToastNotify } from 'src/components/Common';
import { ApiConstants, AppConstants, EnvConstants } from 'src/const';
import { ClassService } from 'src/services';

const useDeleteClass = () => {
    const handleDeleteClass = async ({ id, onSuccess }) => {
        try {
            const response = await ClassService.deleteClass({ id });
            if (response.status === ApiConstants.STT_OK) {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.SUCCESS, message: 'Delete class success!' });
                onSuccess()
            } else {
                AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: response?.message || 'Delete class failed!' })
            }
        } catch (error) {
            EnvConstants.IS_DEV && console.log(error);
            AppToastNotify({ type: AppConstants.NOTIFY_TYPE.ERROR, message: error?.response?.data?.message || 'An error occurred!' })
        }
    }
    return handleDeleteClass;
}

export default useDeleteClass