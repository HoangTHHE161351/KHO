import React, { useEffect } from "react";
import { AppModal, AppToastNotify } from "../Common";
import { Button, InputLabel, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AppAutoCompleteMUI from "../Common/AppAutoCompleteMUI";
import { CurriculumService } from "src/services";
import { AppConstants, EnvConstants } from "src/const";

const StudentCurriculumModal = ({ open, onClose, student, reloadAPi }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [resultData, setResultData] = React.useState([]);
  const [dataSelected, setDataSelected] = React.useState(null);

  const handleAddCurriculum = async () => {
    setIsLoading(true);
    try {
      if (!dataSelected?.id) {
        throw new Error("Please select a curriculum!");
      }
      const response = await CurriculumService.addStudentCurriculum({
        username: student?.username,
        curriculumName: dataSelected?.id,
      });
      if (response.status === 200) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Add curriculum successfully!",
        });
        reloadAPi();
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

  const fetchCurriculumList = async () => {
    setIsFetching(true);
    try {
      const response = await CurriculumService.getDropdownCurriculum();
      if (response.status === 200) {
        setResultData(response.data.data);
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

  useEffect(() => {
    fetchCurriculumList();
  }, [open]);

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
        title: "Add Curriculum",
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
              onClick={handleAddCurriculum}
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
              Curriculum
            </InputLabel>
            <AppAutoCompleteMUI
              options={
                resultData?.map((item) => ({
                  id: item.curriculumName,
                  label: item.curriculumName,
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

export default StudentCurriculumModal;
