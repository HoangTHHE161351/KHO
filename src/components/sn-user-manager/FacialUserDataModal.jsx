import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import { memo, useEffect, useState } from "react";
import {
  AppCommonLoading,
  AppModal,
  AppToastNotify,
} from "src/components/Common";
import FacialCard from "src/components/sn-user-manager/FacialCard";
import FacialLogImageModal from "src/components/sn-user-manager/FacialLogImageModal";
import UploadImage from "src/components/sn-user-manager/UploadImage";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { FacialService } from "src/services";

const FacialUserDataModal = ({ data, open, onClose }) => {
  const [facials, setFacials] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectLogs, setSelectLogs] = useState(null);

  const handleSelect = (id) => {
    console.log(selectedImages, id);
    if (selectedImages.includes(id)) {
      setSelectedImages((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedImages((prev) => [...prev, id]);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setFacials([]);
    setSelectedImages([]);
    setIsFetching(false);
  };

  const deleteImageFacial = async () => {
    setLoading(true);
    try {
      if (selectedImages.length > 0) {
        const response = await FacialService.deleteFacialService(
          data?.id,
          selectedImages
        );
        if (response.status === ApiConstants.STT_OK) {
          facials?.filter((item) => !selectedImages.includes(item.id));
          AppToastNotify({
            type: AppConstants.NOTIFY_TYPE.SUCCESS,
            message: response?.data?.message || "Delete image successful!",
          });
        } else {
          AppToastNotify({
            type: AppConstants.NOTIFY_TYPE.SUCCESS,
            message: response?.data?.message || "Delete image failure!",
          });
        }
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    } finally {
      setLoading(false);
    }
  };

  const getImageFacial = async () => {
    setIsFetching(true);
    try {
      const response = await FacialService.viewFacialService(data.id);
      if (response.status === ApiConstants.STT_OK) {
        setFacials(response.data.data);
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

  useEffect(() => {
    if (data?.id) {
      getImageFacial();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, open]);

  useEffect(() => {
    return () => {
      setFacials([]);
      setIsFetching(false);
      setSelectedImages([]);
    };
  }, []);

  return (
    <>
      <AppCommonLoading isFetching={loading} />
      <AppModal
        open={open}
        onClose={handleCloseModal}
        modalTitleProps={{ title: "Edit Face Id" }}
        sx={{
          "& .MuiDialog-paper ": {
            minWidth: 1200,
            minHeight: 600,
          },
        }}
        modalActionsProps={{
          children: (
            <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={deleteImageFacial}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSelectLogs(data?.id)}
              >
                Load Image
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Add Facial
              </Button>
            </Stack>
          ),
        }}
        modalContentProps={{
          content: (
            <Grid container columnSpacing={2} rowSpacing={2} px={2}>
              {!isFetching ? (
                facials?.map((facial) => (
                  <FacialCard
                    data={facial}
                    key={facial.id}
                    onSelect={handleSelect}
                  />
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
      <UploadImage
        userId={data?.id}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          handleCloseModal();
        }}
      />
      <FacialLogImageModal
        open={selectLogs}
        userId={selectLogs}
        onAddImage={getImageFacial}
        onClose={() => setSelectLogs(null)}
      />
    </>
  );
};

export default memo(FacialUserDataModal);
