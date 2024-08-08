import { LoadingButton } from "@mui/lab";
import { Button, InputLabel, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import AppAutoCompleteMUI from "src/components/Common/AppAutoCompleteMUI";
import { AppConstants, EnvConstants } from "src/const";
import { StudentClassService, StudentService } from "src/services";

const AddStudentClassModal = ({ open, onClose, data, onSuccess }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState(null);
  const [resultData, setResultData] = React.useState([]);

  const fetchStudentList = async () => {
    setIsFetching(true);
    try {
      const response = await StudentService.getStudentListService({});
      if (response.status === 200) {
        setResultData(response.data.data?.content);
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

  const handleAddStudent = async () => {
    setIsLoading(true);
    try {
      if (!dataSelected?.id) {
        throw new Error("Please select a student!");
      }
      const response = await StudentClassService.createStudentClassService({
        className: data?.className,
        username: dataSelected?.id,
      });
      if (response.status === 200) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Add student successfully!",
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
    fetchStudentList();
  }, [data]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          height: 500,
        },
      }}
      modalTitleProps={{
        title: "Add Student",
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
              onClick={handleAddStudent}
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
              Username
            </InputLabel>
            <AppAutoCompleteMUI
              options={
                resultData?.map((item) => ({
                  id: item.username,
                  label: item.username,
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

export default AddStudentClassModal;
