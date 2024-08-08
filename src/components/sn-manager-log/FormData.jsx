import { Box, Grid, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { AppFormDatePicker, AppFormSelect, AppFormTextField } from "../Common";
import { DataConstants } from "src/const";
import DefaultAvatar from "src/assets/images/user-default.png";
import { useWatch } from "react-hook-form";

const FormData = ({ control, errors, onSetValue, isEdit = false }) => {
  const [avatarURL, setAvatarURL] = React.useState(DefaultAvatar);

  const { avatar } = useWatch({ control });

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      getBase64(file);
    }
  };

  const getBase64 = (fileInput) => {
    let reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setAvatarURL(reader.result);
      onSetValue("avatar", reader.result);
    };
  };

  useEffect(() => {
    setAvatarURL(avatar);
  }, [avatar]);

  return (
    <Grid container columnSpacing={"16px"}>
      <Grid item xs={3}>
        <Tooltip title="Upload Avatar" placement="bottom">
          <Box
            position={"relative"}
            className="avatar-upload"
            sx={{
              "& :hover": {
                cursor: "pointer",
              },
            }}
          >
            <Box className="avatar-edit">
              <input
                type="file"
                id="imageUpload"
                onChange={handleChangeAvatar}
                accept=".png, .jpg, .jpeg"
              />
            </Box>
            <label
              htmlFor="imageUpload"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box className="avatar-preview">
                <div
                  id="imagePreview"
                  style={{
                    backgroundImage: `url(${avatarURL})`,
                    borderRadius: "100%",
                  }}
                ></div>
              </Box>
            </label>
            <AppFormTextField
              control={control}
              name={"avatar"}
              required
              labelProps={{
                sx: {
                  "& .MuiFormLabel-asterisk": {
                    display: "none",
                  },
                },
              }}
              rules={{ require: true }}
              textfieldProps={{
                error: !!errors?.avatar,
                helperText: errors?.avatar?.message?.toString() || "",
                sx: {
                  position: "absolute",
                  bottom: 0,
                  width: "50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: -5,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Grid>
      <Grid container item xs={9} rowSpacing={"12px"} columnSpacing={"8px"}>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"firstName"}
            label={"First Name"}
            required
            rules={{ required: true }}
            textfieldProps={{
              error: !!errors?.firstName,
              helperText: errors?.firstName?.message?.toString() || "",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"lastName"}
            label={"Last Name"}
            required
            rules={{ required: true }}
            textfieldProps={{
              error: !!errors?.lastName,
              helperText: errors?.lastName?.message?.toString() || "",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"username"}
            label={"Username"}
            required
            rules={{ required: true }}
            textfieldProps={{
              disabled: isEdit,
              error: !!errors?.username,
              helperText: errors?.username?.message?.toString() || "",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"email"}
            label={"Email Address"}
            required
            textfieldProps={{
              disabled: isEdit,
              autoComplete: "email",
              error: !!errors?.email,
              helperText: errors?.email?.message?.toString() || "",
            }}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"phoneNumber"}
            label={"Phone Number"}
            required
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            }}
            textfieldProps={{
              autoComplete: "phoneNumber",
              error: !!errors?.phoneNumber,
              helperText: errors?.phoneNumber?.message?.toString() || "",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormDatePicker
            required
            control={control}
            name={"dob"}
            label={"Date of birth"}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormSelect
            required
            name="roleName"
            label="Role"
            control={control}
            list={DataConstants.ROLE_LIST}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormSelect
            required
            name="sex"
            label="Gender"
            control={control}
            list={DataConstants.GENDER_LIST}
          />
        </Grid>
        <Grid item xs={12}>
          <AppFormTextField
            required
            name="address"
            label="Address"
            control={control}
            rules={{ require: true }}
            textfieldProps={{
              error: !!errors?.address,
              helperText: errors?.address?.message?.toString() || "",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormData;
