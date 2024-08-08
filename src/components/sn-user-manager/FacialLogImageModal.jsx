import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import {
  AppCommonLoading,
  AppModal,
  AppToastNotify,
} from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { FacialService } from "src/services";

const FacialLogImageModal = ({ open, onClose, userId, onAddImage }) => {
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    onClose();
    setImages([]);
  };

  const getImageLogs = async () => {
    setIsFetching(true);
    try {
      const response = await FacialService.getImageLogs(
        dayjs().format("YYYY-MM-DD HH:mm:ss")
      );
      if (response.status === ApiConstants.STT_OK) {
        setImages(response.data.data);
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.data?.message || "An error occurred",
        });
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const addFaceId = async ({ image }) => {
    setLoading(true);
    try {
      if (userId) {
        const response = await FacialService.addFacialService(userId, {
          image: image,
        });
        if (response.status === ApiConstants.STT_OK) {
          AppToastNotify({
            type: AppConstants.NOTIFY_TYPE.SUCCESS,
            message: "Add facial successful!",
          });
          onAddImage();
          onClose();
        } else {
          AppToastNotify({
            type: AppConstants.NOTIFY_TYPE.ERROR,
            message: response?.data?.message || "An error occurred!",
          });
        }
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    getImageLogs();
    return () => {
      setImages([]);
    };
  }, []);

  return (
    <>
      <AppCommonLoading isFetching={loading} />
      <AppModal
        open={open}
        onClose={handleCloseModal}
        modalTitleProps={{ title: "Image Logs" }}
        sx={{
          "& .MuiDialog-paper ": {
            minWidth: 900,
            minHeight: 500,
          },
        }}
        modalContentProps={{
          content: (
            <Grid container columnSpacing={2} rowSpacing={2} px={2}>
              {!isFetching ? (
                images?.map((data) => (
                  <Grid item xs={3} key={data.id}>
                    <Card
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 2px 0px",
                        mb: "4px",
                      }}
                    >
                      <Box
                        position={"relative"}
                        width={"100%"}
                        sx={{
                          aspectRatio: "1/1",
                        }}
                      >
                        <img
                          src={data?.pic}
                          alt={""}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "fill",
                          }}
                        />
                      </Box>
                      <Stack spacing={2} sx={{ p: 3 }}>
                        <Typography
                          color="inherit"
                          underline="hover"
                          variant="subtitle2"
                          noWrap
                          textAlign={"center"}
                        >
                          {dayjs(data?.time).format(
                            AppConstants.DATE_TIME_FORMAT
                          )}
                        </Typography>
                        <LoadingButton
                          variant="contained"
                          color={"info"}
                          onClick={() => addFaceId({ image: data.pic })}
                        >
                          <Typography textAlign={"center"} fontWeight={"500"}>
                            Add
                          </Typography>
                        </LoadingButton>
                      </Stack>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={300}
                  width={"100%"}
                >
                  <CircularProgress />
                </Stack>
              )}
            </Grid>
          ),
        }}
      />
    </>
  );
};

export default memo(FacialLogImageModal);
