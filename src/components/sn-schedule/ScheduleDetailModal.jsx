import React, { memo, useEffect } from "react";
import {
  AppFormAutoComplete,
  AppFormControlToggle,
  AppFormDatePicker,
  AppFormTextField,
  AppModal,
  AppToastNotify,
} from "../Common";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import {
  ApiConstants,
  AppConstants,
  DataConstants,
  EnvConstants,
} from "src/const";
import useCreateSchedule from "./hooks/useCreateSchedule";
import useEditSchedule from "./hooks/useEditSchedule";
import useDeleteSchedule from "./hooks/useDeleteSchedule";
import { SystemService } from "src/services";

const ScheduleDetailModal = ({ data, open, onClose }) => {
  const [initialValue, setInitialValue] = React.useState(DEFAULT_VALUE);
  const [subjects, setSubjects] = React.useState([]);
  const [classRoom, setClassRoom] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [loadingTeacher, setLoadingTeacher] = React.useState(false);
  const [loadingClass, setLoadingClass] = React.useState(false);
  const [loadingSubject, setLoadingSubject] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ values: initialValue });

  const { subjectCode } = useWatch({ control });

  const getSubjectList = async () => {
    setLoadingSubject(true);
    try {
      const response = await SystemService.getSubjectList();
      if (response.status === ApiConstants.STT_OK) {
        setSubjects(response.data.data);
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    } finally {
      setLoadingSubject(false);
    }
  };

  const getClassRoom = async (subjectId) => {
    setLoadingClass(true);
    try {
      const response = await SystemService.getClassroomList(subjectId);

      if (response.status === ApiConstants.STT_OK) {
        setClassRoom(response.data.data);
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    } finally {
      setLoadingClass(false);
    }
  };

  const getTeachers = async (subjectId) => {
    setLoadingTeacher(true);
    try {
      const response = await SystemService.getTeacherList(subjectId);
      if (response.status === ApiConstants.STT_OK) {
        setTeachers(response.data.data);
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    } finally {
      setLoadingTeacher(false);
    }
  };

  const semesterList = useSelector(
    (state) => state.semesterReducer.semesterList
  );
  const handleCreateSchedule = useCreateSchedule();
  const handleEditSchedule = useEditSchedule();
  const handleDeleteSchedule = useDeleteSchedule();

  const handleSubmitData = (dataSubmit) => {
    if (data.id) {
      handleEditSchedule({
        id: data?.id,
        ...dataSubmit,
        subjectCode: dataSubmit?.subjectCode?.id || dataSubmit?.subjectCode,
        date: dataSubmit?.date?.format(AppConstants.DATE_FORMAT),
        className: dataSubmit?.className?.label || dataSubmit?.className,
        teacherCode: dataSubmit?.teacherCode?.label || dataSubmit?.teacherCode,
        status: dataSubmit?.status
          ? DataConstants.STATUS_TYPE.ACTIVE
          : DataConstants.STATUS_TYPE.INACTIVE,
      });
    } else {
      handleCreateSchedule({
        ...dataSubmit,
        subjectCode: dataSubmit?.subjectCode?.id,
        date: dataSubmit?.date?.format(AppConstants.DATE_FORMAT),
        className: dataSubmit?.className?.label,
        teacherCode: dataSubmit?.teacherCode?.label,
        status: dataSubmit?.status
          ? DataConstants.STATUS_TYPE.ACTIVE
          : DataConstants.STATUS_TYPE.INACTIVE,
      });
    }
    onClose();
    reset(DEFAULT_VALUE);
  };

  useEffect(() => {
    if (data) {
      setInitialValue({
        semester: data?.semester || null,
        className: data?.className || null,
        subjectCode: data?.subjectCode || null,
        teacherCode: data?.teacherCode || null,
        date: data?.date ? dayjs(data?.date) : null,
        timeSlot: data?.time || "",
        room: data?.room || "",
        description: data?.description || "",
        status:
          data?.status === DataConstants.STATUS_TYPE.ACTIVE ? true : false,
        errorMess: data?.errorMess || "",
      });
    }
  }, [data]);

  useEffect(() => {
    getSubjectList();
  }, []);

  useEffect(() => {
    if (subjectCode?.code) {
      getClassRoom(subjectCode?.code);
      getTeachers(subjectCode?.code);
    }
  }, [subjectCode]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit(handleSubmitData)}
      modalTitleProps={{
        title: data?.id ? "Update Schedule" : "Create Schedule",
      }}
      sx={{
        "&& .MuiDialog-paper": {
          minWidth: 900,
        },
      }}
      modalContentProps={{
        content: (
          <Stack px={3} pt={1} spacing={2}>
            <Box>
              <Grid container rowSpacing={2} columnSpacing={2.5}>
                <Grid item xs={6}>
                  <AppFormTextField
                    required
                    name="room"
                    label="Room"
                    control={control}
                    textfieldProps={{
                      disabled: true,
                      error: errors?.room,
                      helperText: errors?.room?.message,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppFormAutoComplete
                    required
                    name="subjectCode"
                    label="Subject"
                    control={control}
                    options={convertSubjectListToAutoComplete(subjects)}
                    autocompleteProps={{
                      loading: loadingSubject,
                      textFieldProps: {
                        error: errors?.subjectCode,
                        helperText: errors?.subjectCode?.message,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppFormTextField
                    required
                    name="timeSlot"
                    label="Time Slot"
                    control={control}
                    textfieldProps={{
                      disabled: true,
                      error: errors?.timeSlot,
                      helperText: errors?.timeSlot?.message,
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <AppFormAutoComplete
                    required
                    name="semester"
                    label="Semester"
                    control={control}
                    options={convertSemesterListToAutoComplete(semesterList)}
                    autocompleteProps={{
                      disabled: true,
                      textFieldProps: {
                        error: errors?.semester,
                        helperText: errors?.semester?.message,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppFormAutoComplete
                    required
                    name="className"
                    label="Class"
                    control={control}
                    options={convertClassListToAutoComplete(classRoom)}
                    autocompleteProps={{
                      loading: loadingClass,
                      textFieldProps: {
                        error: errors?.className,
                        helperText: errors?.className?.message,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppFormAutoComplete
                    required
                    name="teacherCode"
                    label="Teacher"
                    control={control}
                    options={convertTeacherCodeListToAutoComplete(teachers)}
                    autocompleteProps={{
                      loading: loadingTeacher,
                      textFieldProps: {
                        error: errors?.teacherCode,
                        helperText: errors?.teacherCode?.message,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppFormDatePicker
                    required
                    name="date"
                    label="Date"
                    control={control}
                    datePickerProps={{
                      disabled: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppFormTextField
                    // required
                    name="description"
                    label="Description"
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppFormControlToggle
                    label="Status"
                    name={"status"}
                    control={control}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        ),
      }}
      modalActionsProps={{
        children: (
          <>
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Cancel
            </Button>
            {data?.id && (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeleteSchedule(data?.id);
                  onClose();
                  reset(DEFAULT_VALUE);
                }}
              >
                Delete
              </Button>
            )}
            <Button type="submit" variant="contained" name="action">
              {data?.id ? "Update" : "Create"}
            </Button>
          </>
        ),
      }}
    />
  );
};

export default memo(ScheduleDetailModal);

const convertSubjectListToAutoComplete = (list) => {
  return list?.map((item) => {
    return {
      id: item?.code,
      code: item?.id,
      label: `${item.code} - ${item.name}`,
    };
  });
};

const convertSemesterListToAutoComplete = (list) => {
  return list?.map((item) => {
    return {
      id: item?.id,
      label: item?.semesterName,
    };
  });
};
const convertTeacherCodeListToAutoComplete = (list) => {
  return list?.map((item) => {
    return {
      id: item?.id,
      label: item?.username,
    };
  });
};

const convertClassListToAutoComplete = (list) => {
  return list?.map((item) => {
    return {
      id: item?.id,
      label: item?.className,
    };
  });
};

const DEFAULT_VALUE = {
  semester: null,
  className: null,
  subjectCode: null,
  teacherCode: null,
  date: null,
  timeSlot: "",
  room: "",
  description: "",
  status: true,
};
