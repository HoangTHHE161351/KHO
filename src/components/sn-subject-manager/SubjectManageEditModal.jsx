import React, { useEffect } from "react";
import { AppModal } from "../Common";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import FormData from "./FormData";
import usePostSubject from "./hooks/usePostSubject";
import { useDispatch } from "react-redux";
import { subjectActions } from "src/redux-store/store";

const SubjectManageEditModal = ({ data, open, onClose }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = React.useState(DEFAULT_VALUE);
  const {
    control,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: initialValues,
  });
  const { handleEditSubject } = usePostSubject();

  const handleSubmitForm = (data) => {
    dispatch(subjectActions.startLoading());
    handleEditSubject({
      ...data,
    });
    reset();
    onClose();
  };

  useEffect(() => {
    if (data) {
      setInitialValues({
        curriculumId: data?.curriculumId,
        name: data?.name,
        code: data?.code,
        slots: data?.slots,
      });
    }
  }, [data]);

  return (
    <AppModal
      open={open}
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      onClose={() => {
        setInitialValues(DEFAULT_VALUE);
        reset();
        onClose();
      }}
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
            <FormData
              control={control}
              errors={errors}
              onSetValue={setValue}
              isEdit={true}
            />
          </Box>
        ),
        sx: { p: 0 },
      }}
      modalActionsProps={{
        children: (
          <>
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="contained" name="action">
              Save
            </Button>
          </>
        ),
      }}
    />
  );
};

export default SubjectManageEditModal;

const DEFAULT_VALUE = {
  curriculumId: "",
  name: "",
  code: "",
  slots: "",
};
