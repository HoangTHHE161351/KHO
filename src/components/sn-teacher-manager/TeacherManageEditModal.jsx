import React, { useEffect } from "react";
import { AppModal } from "../Common";
import { Box, Button, CircularProgress } from "@mui/material";
import { AppConstants, DataConstants } from "src/const";
import { useForm } from "react-hook-form";
import FormData from "./FormData";
import dayjs from "dayjs";
import usePostTeacher from "./hooks/usePostTeacher";
import { useDispatch } from "react-redux";
import { teacherActions } from "src/redux-store/store";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// const TeacherManageEditModal = ({
//   data,
//   open,
//   onClose,
//   subjects,
//   isFetchingSubjects,
// }) => {
const TeacherManageEditModal = ({ data, open, onClose }) => {
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
  const { handleEditTeacher } = usePostTeacher();

  const handleSubmitForm = (dataSubmit) => {
    console.log(dataSubmit);
    dispatch(teacherActions.startLoading());
    handleEditTeacher({
      ...dataSubmit,
      dob: dataSubmit.dob.format(AppConstants.ISO_DATE_FORMAT),
      id: data.id,
    });
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
        sex: data?.gender,
        dob: data?.dob ? dayjs(data.dob) : null,
        roleName:
          DataConstants?.ROLE?.[data?.roleName] || DataConstants.ROLE.STAFF,
        address: data?.address,
        avatar: data?.avata,
      });
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("Subjects:", subjects);
  //   console.log("Is fetching subjects:", isFetchingSubjects);
  // }, [subjects, isFetchingSubjects]);

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
        title: "Teacher Detail",
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

export default TeacherManageEditModal;

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
  role: DataConstants.ROLE.STAFF,
};
