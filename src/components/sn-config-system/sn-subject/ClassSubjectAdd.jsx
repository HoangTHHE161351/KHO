import { LoadingButton } from "@mui/lab";
import { Button, InputLabel, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppModal, AppToastNotify } from "src/components/Common";
import AppAutoCompleteMUI from "src/components/Common/AppAutoCompleteMUI";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { ClassSubjectService, RoomService } from "src/services";

const ClassSubjectAdd = ({ open, onClose, classSubject, onSuccess }) => {
  const [resultData, setResultData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSelected, setDataSelected] = useState(null);

  const getClassSubject = async () => {
    setIsFetching(true);
    try {
      const response = await RoomService.getClassRoomPickerData();

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

  const handleAddClass = async () => {
    setIsLoading(true);
    try {
      if (!dataSelected?.id) {
        throw new Error("Please select a class!");
      }
      const response = await ClassSubjectService.createClassSubject({
        subjectId: classSubject?.id,
        classId: dataSelected?.id,
      });
      if (response.status === ApiConstants.STT_OK) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Add class subject successfully!",
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
    getClassSubject();
  }, [classSubject]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      modalTitleProps={{
        title: "Add Class",
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
              onClick={handleAddClass}
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
              Class
            </InputLabel>
            <AppAutoCompleteMUI
              options={
                resultData?.map((item) => ({
                  id: item.id,
                  label: item.className,
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

export default ClassSubjectAdd;
