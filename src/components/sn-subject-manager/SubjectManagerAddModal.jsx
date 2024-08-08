import React from "react";
import { AppModal } from "../Common";
import { Box, Button } from "@mui/material";
import { AppConstants } from "src/const";
import { useForm } from "react-hook-form";
import FormData from "./FormData";
import usePostSubject from "./hooks/usePostSubject";
import { useDispatch } from "react-redux";
import { subjectActions } from "src/redux-store/store";

const SubjectManageAddModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const { handleCreateSubject } = usePostSubject();

  const handleSubmitForm = (data) => {
    handleCreateSubject({
      ...data,
      dob: data.dob.format(AppConstants.ISO_DATE_FORMAT),
    });
    dispatch(subjectActions.startLoading());
    reset();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      sx={{
        "&& .MuiDialog-paper": {
          minWidth: 900,
        },
      }}
      modalTitleProps={{
        title: "Subject Detail",
      }}
      modalContentProps={{
        content: (
          <Box px={3} pt={1}>
            <FormData control={control} errors={errors} onSetValue={setValue} />
          </Box>
        ),
        sx: { p: 0 },
      }}
      modalActionsProps={{
        children: (
          <>
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" name="action">
              Create
            </Button>
          </>
        ),
      }}
    />
  );
};

export default SubjectManageAddModal;

const DEFAULT_VALUE = {
  curriculumId: "",
  name: "",
  code: "",
  slots: "",
};
