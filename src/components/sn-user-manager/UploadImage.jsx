import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { PlusIcon } from "src/assets/icons";
import {
  AppCommonLoading,
  AppModal,
  AppToastNotify,
} from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { FacialService } from "src/services";

const UploadImage = ({ open, onClose, userId }) => {
  const [image, setImage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleUploadAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      getBase64(file);
    }
  };

  // Function to convert file to base64
  const getBase64 = (fileInput) => {
    let reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  const addFaceId = async () => {
    setIsFetching(true);
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
      setIsFetching(false);
      setImage(null);
      onClose();
    }
  };

  return (
    <>
      <AppCommonLoading isFetching={isFetching} />
      <AppModal
        open={open}
        onClose={onClose}
        modalTitleProps={{ title: "Add New Facial" }}
        modalActionsProps={{
          children: (
            <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
              <Button variant="outlined" color="inherit" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={addFaceId}>
                Upload
              </Button>
            </Stack>
          ),
        }}
        modalContentProps={{
          content: (
            <Stack direction={"column"} spacing={1}>
              <Stack
                component={"label"}
                htmlFor="coverUpload"
                sx={{
                  aspectRatio: "16/9",
                  width: "100%",
                  border: "1.5px dashed #BDC1CAFF",
                  borderRadius: "6px",
                  backgroundColor: "common.white",
                  justifyContent: "center",
                  alignItems: "center",
                  ":hover": { cursor: "pointer" },
                  position: "relative",
                }}
              >
                {image && (
                  <img
                    alt="Group Background"
                    src={image}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                )}
                {!image && (
                  <PlusIcon
                    sx={{
                      width: "40px",
                      height: "38px",
                      color: "primary.main",
                    }}
                  />
                )}
              </Stack>
              <input
                type="file"
                id="coverUpload"
                onChange={handleUploadAvatar}
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
              />
            </Stack>
          ),
        }}
      />
    </>
  );
};

export default UploadImage;
