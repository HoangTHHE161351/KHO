import { LoadingButton } from "@mui/lab";
import { Button, InputLabel, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { AppModal, AppTextField, AppToastNotify } from "src/components/Common";
import AppAutoCompleteMUI from "src/components/Common/AppAutoCompleteMUI";
import { AppConstants, EnvConstants } from "src/const";
import { CurriculumService, SubjectService } from "src/services";

const AddSubjectModal = ({ data, open, onClose, onSuccess }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState(null);
  const [semesterNo, setSemesterNo] = React.useState(null);
  const [resultData, setResultData] = React.useState([]);

  const addSubjectCurriculum = async () => {
    setIsLoading(true);
    try {
      if (!dataSelected?.id) {
        throw new Error("Please select a subject!");
      }

      if (!semesterNo) {
        throw new Error("Please enter a semester!");
      }

      const response = await CurriculumService.addSubjectCurriculum({
        curriculumName: data?.curriculumName,
        subjectCode: dataSelected?.id,
        semesterNo: Number(semesterNo),
      });
      if (response.status === 200) {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Add subject successfully!",
        });
        onSuccess();
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

  //   const getSemesterAsync = async () => {
  //     setIsFetchingSemester(true);
  //     try {
  //       const response = await SemesterService.getSemesterPickerData();
  //       if (response.status === 200) {
  //         setResultDataSemester(response.data.data);
  //       } else {
  //         throw new Error(response?.data?.message || "An error occurred");
  //       }
  //     } catch (error) {
  //       EnvConstants.IS_DEV && console.log(error);
  //       AppToastNotify({
  //         type: AppConstants.NOTIFY_TYPE.ERROR,
  //         message:
  //           error?.response?.data?.message ||
  //           error.message ||
  //           "An error occurred",
  //       });
  //     } finally {
  //       setIsFetchingSemester(false);
  //     }
  //   };

  const getSubjectAsync = async () => {
    setIsFetching(true);
    try {
      const response = await SubjectService.getSubjectPickerData();
      if (response.status === 200) {
        setResultData(response.data.data);
      } else {
        throw new Error(response?.data?.message || "An error occurred");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error.message ||
          "An error occurred",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getSubjectAsync();
  }, [data]);

  return (
    <AppModal
      open={open}
      onClose={() => {
        onClose();
        setDataSelected(null);
        setSemesterNo(null);
      }}
      sx={{
        "& .MuiPaper-root": {
          height: 500,
        },
      }}
      modalTitleProps={{
        title: "Add Subject",
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button
              variant="outlined"
              onClick={() => {
                onClose();
                setDataSelected(null);
                setSemesterNo(null);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="success"
              loading={isLoading}
              onClick={addSubjectCurriculum}
            >
              Add
            </LoadingButton>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: (
          <Stack direction={"column"} spacing={2} px={2}>
            <Stack direction={"column"} spacing={1}>
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
                    label: item.code,
                  })) || []
                }
                onChange={(_, value) => setDataSelected(value)}
                loading={isFetching}
              />
            </Stack>
            <Stack direction={"column"} spacing={1}>
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
                Semester
              </InputLabel>
              <AppTextField
                fullWidth
                onChange={(e) => setSemesterNo(e.target.value)}
                type={"number"}
              />
            </Stack>
          </Stack>
        ),
      }}
    />
  );
};

export default AddSubjectModal;
