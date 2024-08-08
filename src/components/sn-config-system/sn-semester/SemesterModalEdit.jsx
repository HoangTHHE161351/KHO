import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import React, { useMemo, memo, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  AppFormControlToggle,
  AppFormDatePicker,
  AppFormTextField,
  AppModal,
} from "src/components/Common";
import { DataConstants } from "src/const";
import useCreateSemester from "./hooks/useCreateSemester";
import useUpdateSemester from "./hooks/useUpdateSemester";

const SemesterModalEdit = ({ open, onClose, data, onSuccess }) => {
  const [initialValue, setInitialValue] = React.useState(DEFAULT_VALUE);

  const { control, handleSubmit, reset } = useForm({
    values: initialValue,
    // defaultValues: DEFAULT_VALUE,
  });

  const handleCreateSemester = useCreateSemester();
  const handleUpdateSemester = useUpdateSemester();

  const handleSubmitForm = (dataSubmit) => {
    if (data) {
      handleUpdateSemester({
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
      handleCreateSemester({
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
        semesterName: data.semesterName,
        startTime: data.startTime ? dayjs(data.startTime) : null,
        endTime: data.endTime ? dayjs(data.endTime) : null,
        description: data.description,
        status: data.status === DataConstants.STATUS_TYPE.ACTIVE ? true : false,
      });
    }
  }, [data]);

  // const handleSubmitForm = (data) => {
  //   handleCreateSemester({ data, onSuccess });
  //   reset(DEFAULT_VALUE);
  //   onClose();
  // };

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
        title: "Update Semester",
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="success">
              Update
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
              // required
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

export default memo(SemesterModalEdit);

const DEFAULT_VALUE = {
  semesterName: "",
  startTime: null,
  endTime: null,
  description: "",
  status: false,
};
