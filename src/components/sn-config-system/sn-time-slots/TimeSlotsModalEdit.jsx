import { Button, Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AppFormControlToggle,
  AppFormTextField,
  AppFormTimePicker,
  AppModal,
} from "src/components/Common";
import { AppConstants, DataConstants } from "src/const";
import useCreateTimeSlots from "./hooks/useCreateTimeSlots";
import useUpdateTimeSlots from "./hooks/useUpdateTimeSlots";
import dayjs from "dayjs";

const RoomModalEdit = ({ open, onClose, data, onSuccess }) => {
  const [initialValue, setInitialValue] = React.useState(DEFAULT_VALUE);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: initialValue,
  });
  const handleCreateTimeSlots = useCreateTimeSlots();
  const handleUpdateTimeSlots = useUpdateTimeSlots();

  const handleSubmitForm = (dataSubmit) => {
    if (data) {
      handleUpdateTimeSlots({
        data: {
          ...dataSubmit,
          id: data.id,
          startTime: dayjs(dataSubmit.startTime).format(
            AppConstants.TIME_FORMAT_YYYYescape
          ),
          endTime: dayjs(dataSubmit.endTime).format(
            AppConstants.TIME_FORMAT_YYYYescape
          ),
          statusEdit: dataSubmit.statusEdit
            ? DataConstants.STATUS_TYPE.ACTIVE
            : DataConstants.STATUS_TYPE.INACTIVE,
        },
        onSuccess,
      });
    } else {
      handleCreateTimeSlots({
        data: {
          ...dataSubmit,
          startTime: dayjs(dataSubmit.startTime).format(
            AppConstants.TIME_FORMAT_YYYYescape
          ),
          endTime: dayjs(dataSubmit.endTime).format(
            AppConstants.TIME_FORMAT_YYYYescape
          ),
          statusEdit: dataSubmit.statusEdit
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
        slotName: data.slotName,
        startTime: data.startTime ? dayjs(data.startTime, "HH:mm") : null,
        endTime: data.endTime ? dayjs(data.endTime, "HH:mm") : null,
        description: data.description,
        statusEdit:
          data.status === DataConstants.STATUS_TYPE.ACTIVE ? true : false,
      });
    }
  }, [data, open]);

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
        title: data ? "Edit Time Slots" : "Create Time Slots",
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
              label={"Slot Name"}
              name={"slotName"}
              required
              control={control}
            />
            <AppFormTimePicker
              label={"Start Time"}
              name={"startTime"}
              rules={{
                required: { value: true, message: "Start Time is required" },
              }}
              required
              control={control}
              timePickerProps={{
                slotProps: {
                  textField: {
                    error: !!errors?.startTime,
                    helperText: errors?.startTime?.message,
                  },
                },
              }}
            />
            <AppFormTimePicker
              label={"End Time"}
              name={"endTime"}
              rules={{
                required: { value: true, message: "End Time is required" },
              }}
              required
              control={control}
              timePickerProps={{
                slotProps: {
                  textField: {
                    error: !!errors?.endTime,
                    helperText: errors?.endTime?.message,
                  },
                },
              }}
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
              name={"statusEdit"}
            />
          </Stack>
        ),
      }}
    />
  );
};

export default memo(RoomModalEdit);

const DEFAULT_VALUE = {
  slotName: "",
  roomName: "",
  description: "",
  status: false,
};
