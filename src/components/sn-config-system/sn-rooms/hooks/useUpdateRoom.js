import { AppToastNotify } from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { RoomService } from "src/services";

const useUpdateRoom = () => {
  const handleUpdateRoom = async ({ data, onSuccess }) => {
    try {
      //const { id, ...body } = data
      if (!data.id) throw new Error("Update room failed!");
      const response = await RoomService.editRoom(data);
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Update room success!",
        });
        onSuccess();
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "Update room failed!",
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
  return handleUpdateRoom;
};

export default useUpdateRoom;
