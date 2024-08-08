import { memo, useEffect, useState } from "react";
import { AppModal } from "../Common";
import { Button, Stack } from "@mui/material";
import FormContentModal from "./FormContentModal";
import { useForm } from "react-hook-form";
import useDeviceAction from "./hooks/useDeviceAction";
import { DataConstants } from "src/const";

const DeviceEditModal = ({ data, open, onClose, onSuccess }) => {
  const [initialValues, setInitialValues] = useState(DEFAULT_VALUE);
  const { control, handleSubmit, reset } = useForm({
    values: initialValues,
  });
  const { handleUpdateDevice } = useDeviceAction();

  const handleSubmitForm = (dataSubmit) => {
    handleUpdateDevice(
      {
        ...dataSubmit,
        id: data.id,
        username: undefined,
        password: undefined,
        status: dataSubmit.status
          ? DataConstants.STATUS_TYPE.ACTIVE
          : DataConstants.STATUS_TYPE.INACTIVE,
        roomName: dataSubmit.roomName?.id
          ? dataSubmit.roomName?.id
          : dataSubmit.roomName,
      },
      onSuccess
    );
    onClose();
    reset(DEFAULT_VALUE);
    setInitialValues(DEFAULT_VALUE);
  };

  useEffect(() => {
    if (data) {
      setInitialValues({
        ipTcpip: data?.ip,
        port: data?.port,
        username: data?.username,
        password: data?.password,
        description: data?.description,
        checkType: data?.checkType,
        cameraType: data?.cameraType,
        roomId: data?.roomName,
        status:
          data?.status === DataConstants.STATUS_TYPE.ACTIVE ? true : false,
      });
    }
  }, [data, open]);

  return (
    <AppModal
      open={open}
      onClose={() => {
        onClose();
        reset(DEFAULT_VALUE);
        setInitialValues(DEFAULT_VALUE);
      }}
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      modalTitleProps={{
        title: "Edit Device",
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button
              variant="outlined"
              onClick={() => {
                onClose();
                reset(DEFAULT_VALUE);
                setInitialValues(DEFAULT_VALUE);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="success">
              Update
            </Button>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: <FormContentModal control={control} isEdit={true} />,
      }}
    />
  );
};

export default memo(DeviceEditModal);

const DEFAULT_VALUE = {
  ipTcpip: "",
  port: "",
  username: null,
  password: null,
  description: "",
  checkType: "",
  cameraType: "",
  roomName: "",
  status: DataConstants.STATUS_TYPE.ACTIVE,
};
