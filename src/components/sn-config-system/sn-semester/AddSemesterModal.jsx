import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  AppFormControlToggle,
  AppFormDatePicker,
  AppFormTextField,
  AppModal,
} from "src/components/Common";
import useCreateSemester from "./hooks/useCreateSemester";

const AddSemesterModal = ({ open, onClose, onSuccess }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateSemester = useCreateSemester();

  const handleSubmitForm = (data) => {
    handleCreateSemester({ data, onSuccess });
    reset(DEFAULT_VALUE);
    onClose();
  };

  const { startTime } = useWatch({ control });

  const minToDate = useMemo(() => {
    return startTime ? dayjs(startTime) : null;
  }, [startTime]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      component={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
      modalTitleProps={{
        title: "Create Semester",
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="success">
              Create
            </Button>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: (
          <Stack direction={"column"} spacing={1.5} px={3}>
            <AppFormTextField
              label={"Semester Name"}
              name={"semesterName"}
              required
              control={control}
            />
            <AppFormDatePicker
              control={control}
              name={"startTime"}
              datePickerProps={{
                maxDate: undefined,
              }}
              required
              label={"Start Time"}
            />
            <AppFormDatePicker
              control={control}
              name={"endTime"}
              datePickerProps={{
                maxDate: undefined,
                minDate: minToDate,
              }}
              required
              label={"End Time"}
            />
            <AppFormTextField
              label={"Description"}
              name={"description"}
              //required
              control={control}
            />
            <AppFormControlToggle
              label={"Semester Status"}
              name={"status"}
              control={control}
            />
          </Stack>
        ),
      }}
    />
  );
};

export default AddSemesterModal;

const DEFAULT_VALUE = {
  semesterName: "",
  startTime: null,
  endTime: null,
  description: "",
  status: true,
};
