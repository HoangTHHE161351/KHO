import React, { useEffect } from "react";
import { AppModal, AppToastNotify } from "../Common";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import AvatarDefault from "src/assets/images/user-default.png";
import { CurriculumService } from "src/services";
import { AppConstants, EnvConstants } from "src/const";
import StudentCurriculumModal from "./StudentCurriculumModal";

const DetailModal = ({ data, open, onClose }) => {
  const [curriculum, setCurriculum] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [openCurriculumModal, setOpenCurriculumModal] = React.useState(false);

  const getCurriculumStudent = async (studentId) => {
    setIsFetching(true);
    try {
      const response = await CurriculumService.getCurriculumStudent({
        studentId: studentId,
      });
      if (response.status === 200) {
        setCurriculum(response.data.data);
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
    if (data?.id && open) {
      getCurriculumStudent(data?.id);
    }
  }, [data, open]);

  return (
    <>
      <AppModal
        open={open}
        onClose={() => {
          onClose();
          setCurriculum([]);
        }}
        modalTitleProps={{
          title: "Detail Student",
        }}
        sx={{
          "&& .MuiDialog-paper": {
            minWidth: 900,
          },
        }}
        modalContentProps={{
          content: (
            <Grid container px={"24px"} columnSpacing={5}>
              <Grid item xs={3}>
                <Box
                  width={"100%"}
                  height={"unset"}
                  sx={{
                    aspectRatio: 1 / 1,
                    borderRadius: "100%",
                  }}
                >
                  <img
                    src={data?.avata || AvatarDefault}
                    alt="avatar"
                    style={{
                      fill: true,
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                  />
                </Box>
                <Stack direction={"column"} spacing={0} mt={1}>
                  <Typography
                    textAlign={"center"}
                    fontSize={20}
                    fontWeight={600}
                    lineHeight={"24px"}
                  >
                    {data?.fullname}
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    fontSize={16}
                    fontWeight={500}
                    lineHeight={"18px"}
                  >
                    STUDENT
                  </Typography>
                </Stack>
              </Grid>
              <Grid container spacing={2} item xs={9}>
                <Grid item xs={6}>
                  <Typography fontSize={16} fontWeight={600}>
                    Full Name
                  </Typography>
                  <Typography fontSize={16}>{data?.fullname}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize={16} fontWeight={600}>
                    Email
                  </Typography>
                  <Typography fontSize={16}>{data?.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize={16} fontWeight={600}>
                    Phone
                  </Typography>
                  <Typography fontSize={16}>{data?.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize={16} fontWeight={600}>
                    Dob
                  </Typography>
                  <Typography fontSize={16}>{data?.dob}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize={16} fontWeight={600}>
                    Status
                  </Typography>
                  <Typography fontSize={16}>{data?.status}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontSize={16} fontWeight={600}>
                    Address
                  </Typography>
                  <Typography fontSize={16}>{data?.address}</Typography>
                </Grid>

                {curriculum?.length > 0 ? (
                  <Grid item xs={12}>
                    <Typography fontSize={16} fontWeight={600}>
                      Curriculum: {curriculum?.[0]?.curriculumName}
                    </Typography>
                    <Typography fontSize={14}>
                      {curriculum?.[0]?.description}
                    </Typography>
                  </Grid>
                ) : isFetching ? (
                  <Grid item xs={12}>
                    <Typography>Loading...</Typography>
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid item xs={12}>
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => setOpenCurriculumModal(true)}
                  >
                    Add Curriculum
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ),
        }}
      />
      <StudentCurriculumModal
        open={openCurriculumModal}
        onClose={() => setOpenCurriculumModal(false)}
        student={data}
        reloadAPi={() => getCurriculumStudent(data?.id)}
      />
    </>
  );
};

export default DetailModal;
