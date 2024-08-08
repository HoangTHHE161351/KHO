import { Button, Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AppFormControlToggle,
  AppFormTextField,
  AppModal,
} from "src/components/Common";
import { DataConstants } from "src/const";
import useCreateRoom from "./hooks/useCreateRoom";
import useUpdateRoom from "./hooks/useUpdateRoom";

const RoomModalEdit = ({ open, onClose, data, onSuccess }) => {
  const [initialValue, setInitialValue] = React.useState(DEFAULT_VALUE);

  const { control, handleSubmit, reset } = useForm({
    values: initialValue,
  });
  const handleCreateRoom = useCreateRoom();
  const handleUpdateRoom = useUpdateRoom();

  const handleSubmitForm = (dataSubmit) => {
    if (data) {
      handleUpdateRoom({
        data: {
          ...dataSubmit,
          id: data.id,
          status: dataSubmit.status
            ? DataConstants.STATUS_TYPE.ACTIVE
            : DataConstants.STATUS_TYPE.INACTIVE,
        },
        onSuccess,
      });
    } else {
      handleCreateRoom({
        data: {
          ...dataSubmit,
          status: dataSubmit.status
            ? DataConstants.STATUS_TYPE.ACTIVE
            : DataConstants.STATUS_TYPE.INACTIVE,
        },
        onSuccess,
      });
    }
    reset(DEFAULT_VALUE);
    onClose();
  };

  useEffect(() => {
    if (data) {
      setInitialValue({
        roomName: data.roomName,
        description: data.description,
        status: data.status === DataConstants.STATUS_TYPE.ACTIVE ? true : false,
      });
    }
  }, [data]);

  return (
    <AppModal
      open={open}
      onClose={() => {
        onClose();
        reset(DEFAULT_VALUE);
      }}
      component={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
      modalTitleProps={{
        title: data ? "Edit Room" : "Create Room",
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="success">
              {data ? "Update" : "Create"}
            </Button>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: (
          <Stack direction={"column"} spacing={1.5} px={3}>
            <AppFormTextField
              label={"Room Name"}
              name={"roomName"}
              required
              control={control}
            />
            <AppFormTextField
              label={"Description"}
              name={"description"}
              // required
              control={control}
            />
            <AppFormControlToggle
              control={control}
              label={"Status"}
              name={"status"}
            />
          </Stack>
        ),
      }}
    />
  );
};

export default memo(RoomModalEdit);

const DEFAULT_VALUE = {
  roomName: "",
  description: "",
  status: false,
};
