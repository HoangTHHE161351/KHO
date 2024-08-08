import React, { useEffect } from "react";
import { AppModal } from "../Common";
import { Box, Button } from "@mui/material";
import { AppConstants, DataConstants } from "src/const";
import { useForm } from "react-hook-form";
import FormData from "./FormData";
import dayjs from "dayjs";
import usePostUser from "./hooks/usePostUser";
import { useDispatch } from "react-redux";
import { userActions } from "src/redux-store/store";

const UserManageEditModal = ({ data, open, onClose, onSuccess }) => {
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
  const { handleEditUser } = usePostUser();

  const handleSubmitForm = (dataSubmit) => {
    dispatch(userActions.startLoading());
    handleEditUser(
      {
        ...dataSubmit,
        dob: dataSubmit.dob.format(AppConstants.ISO_DATE_FORMAT),
        id: data.id,
      },
      onSuccess
    );
    reset();
    onClose();
  };

  useEffect(() => {
    if (data) {
      setInitialValues({
        email: data?.email,
        username: data?.username,
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phone,
        sex: data?.gender === "MALE" ? 1 : 2,
        dob: data?.dob ? dayjs(data.dob) : null,
        roleName: data?.roleName,
        address: data?.address,
        avatar: data?.avata,
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
        title: "User Detail",
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

export default UserManageEditModal;

const DEFAULT_VALUE = {
  email: "",
  password: "",
  sex: DataConstants.GENDER_LIST[0].id,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dob: null,
  address: "",
  username: "",
  roleName: "TEACHER",
};
