import { Button, Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AppFormControlToggle,
  AppFormTextField,
  AppModal,
} from "src/components/Common";
import { DataConstants } from "src/const";
import useCreateSubject from "./hooks/useCreateSubject";
import useUpdateSubject from "./hooks/useUpdateSubject";

const SubjectModalEdit = ({ open, onClose, data, onSuccess }) => {
  const [initialValue, setInitialValue] = React.useState(DEFAULT_VALUE);

  const { control, handleSubmit, reset } = useForm({
    values: initialValue,
  });
  const handleCreateSubject = useCreateSubject();
  const handleUpdateSubject = useUpdateSubject();

  const handleSubmitForm = (dataSubmit) => {
    if (data) {
      handleUpdateSubject({
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
      handleCreateSubject({
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
        code: data.code,
        name: data.name,
        slots: data.slots,
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
        title: data ? "Edit Subject" : "Create Subject",
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
              label={"Code"}
              name={"code"}
              required
              control={control}
            />
            <AppFormTextField
              label={"Subject Name"}
              name={"name"}
              required
              control={control}
            />
            <AppFormTextField
              label={"Slot"}
              name={"slots"}
              required
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

export default memo(SubjectModalEdit);

const DEFAULT_VALUE = {
  code: "",
  name: "",
  slots: "",
  status: false,
};
