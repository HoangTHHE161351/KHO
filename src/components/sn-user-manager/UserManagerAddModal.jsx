import React from "react";
import { AppModal } from "../Common";
import { Box, Button } from "@mui/material";
import { AppConstants, DataConstants } from "src/const";
import { useForm } from "react-hook-form";
import FormData from "./FormData";
import usePostUser from "./hooks/usePostUser";
import { useDispatch } from "react-redux";
import { userActions } from "src/redux-store/store";

const UserManageAddModal = ({ open, onClose, onSuccess }) => {
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

  const { handleCreateUser } = usePostUser();

  const handleSubmitForm = (data) => {
    handleCreateUser(
      {
        ...data,
        dob: data.dob.format(AppConstants.ISO_DATE_FORMAT),
      },
      onSuccess
    );
    dispatch(userActions.startLoading());
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
        title: "User Detail",
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

export default UserManageAddModal;

const DEFAULT_VALUE = {
  email: "",
  sex: DataConstants.GENDER_LIST[0].id,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dob: null,
  address: "",
  username: "",
  roleName: "TEACHER",
};
