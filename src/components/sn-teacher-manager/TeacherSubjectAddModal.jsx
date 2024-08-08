import { LoadingButton } from "@mui/lab";
import { Button, InputLabel, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import AppAutoCompleteMUI from "src/components/Common/AppAutoCompleteMUI";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { SubjectService, TeacherService } from "src/services";

const TeacherSubjectAddModal = ({
  open,
  onClose,
  teacherDetail,
  onSuccess,
}) => {
  const [resultData, setResultData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSelected, setDataSelected] = useState(null);

  const getTeacherSubject = async () => {
    setIsFetching(true);
    try {
      const response = await SubjectService.getSubjectPickerData();

      if (response.status === ApiConstants.STT_OK) {
        setResultData(response.data?.data);
      } else {
        throw new Error(response.data?.message || "An error occurred!");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddSubject = async () => {
    setIsLoading(true);
    try {
      if (!dataSelected?.id) {
        throw new Error("Please select a class!");
      }
      const response = await TeacherService.addTeacherSubjectService({
        subjectCode: dataSelected?.id,
        teacherCode: teacherDetail?.username,
      });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Add teacher subject successfully!",
        });
        onSuccess?.();
        onClose();
      } else {
        throw new Error(response.data?.message || "An error occurred!");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeacherSubject();
  }, [teacherDetail]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      modalTitleProps={{
        title: "Add Subject",
      }}
      sx={{
        "& .MuiPaper-root": {
          height: 500,
        },
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              color="success"
              onClick={handleAddSubject}
            >
              Add
            </LoadingButton>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: (
          <Stack direction={"column"} spacing={1} px={2}>
            <InputLabel
              sx={{
                "&": {
                  color: "text.primary",
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                },
              }}
              required
            >
              Subject
            </InputLabel>
            <AppAutoCompleteMUI
              options={
                resultData?.map((item) => ({
                  id: item.code,
                  label: item.name,
                })) || []
              }
              onChange={(_, value) => setDataSelected(value)}
              loading={isFetching}
            />
          </Stack>
        ),
      }}
    />
  );
};

export default TeacherSubjectAddModal;
