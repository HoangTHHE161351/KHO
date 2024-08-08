import { Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import {
  AppFormAutoComplete,
  AppFormControlToggle,
  AppFormSelect,
  AppFormTextField,
  AppToastNotify,
} from "../Common";
import { RoomService } from "src/services";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { useWatch } from "react-hook-form";

const FormContentModal = ({ control, isEdit = false }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [rooms, setRooms] = React.useState([]);

  const { cameraType } = useWatch({ control });

  const getRoomsAsync = async () => {
    setIsFetching(true);
    try {
      const response = await RoomService.getRoomPickerData();
      if (response.status === ApiConstants.STT_OK) {
        setRooms(response.data.data);
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response.data.response || "An error occurred",
        });
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.error(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.response || "An error occurred",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getRoomsAsync();
    return () => {
      setRooms([]);
      setIsFetching(false);
    };
  }, []);

  return (
    <Stack direction={"column"} spacing={1} px={"24px"}>
      <AppFormTextField
        label={"IP"}
        control={control}
        name={"ipTcpip"}
        required
      />
      <AppFormTextField
        label={"Port"}
        control={control}
        name={"port"}
        required
      />
      <AppFormAutoComplete
        control={control}
        name={"roomName"}
        label={"Room"}
        required
        options={handleConvertAutoComplete(rooms)}
        autocompleteProps={{
          loading: isFetching,
        }}
      />
      <AppFormTextField
        label={"User Name"}
        control={control}
        name={"username"}
        required={!isEdit}
        textfieldProps={{
          disabled: isEdit,
        }}
      />
      <AppFormTextField
        label={"Password"}
        control={control}
        name={"password"}
        required={!isEdit}
        textfieldProps={{
          disabled: isEdit,
          type: "password",
          inputProps: { autoComplete: "new-password" },
        }}
      />
      <AppFormSelect
        control={control}
        name={"cameraType"}
        label={"Camera Type"}
        required
        list={CAMERA_TYPE}
      />
      <AppFormSelect
        control={control}
        name={"checkType"}
        label={"Check Type"}
        required
        list={CHECK_TYPE}
      />
      {cameraType === "LCD" && !isEdit && (
        <AppFormTextField
          label={"Device Name"}
          control={control}
          name={"deviceName"}
          required
          textfieldProps={{
            type: "number",
          }}
        />
      )}
      <AppFormTextField
        label={"Description"}
        control={control}
        name={"description"}
      />
      <AppFormControlToggle
        control={control}
        name={"status"}
        label={"Device Status"}
      />
    </Stack>
  );
};

export default memo(FormContentModal);

const handleConvertAutoComplete = (data) => {
  return data?.map((item) => {
    return { id: item.id, label: item.roomName };
  });
};

const CAMERA_TYPE = [
  { id: "CCTV", label: "CCTV" },
  { id: "LCD", label: "LCD" },
];

const CHECK_TYPE = [
  { id: "IN", label: "IN" },
  { id: "OUT", label: "OUT" },
  { id: "ADD", label: "ADD" },
];
