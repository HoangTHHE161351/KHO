import { Box, Button, Grid, Tooltip } from "@mui/material";
import React, { memo, useEffect, useMemo } from "react";
import { AppFormDatePicker, AppFormSelect, AppFormTextField } from "../Common";
import DefaultAvatar from "src/assets/images/user-default.png";
import { DataConstants } from "src/const";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { usePostUser } from "../sn-user-manager";
import { useForm } from "react-hook-form";

const InfoUpdate = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  const isStaff = useMemo(() => {
    return (
      userInfo.roleId === DataConstants.ROLE.STAFF ||
      userInfo.roleId === DataConstants.ROLE.ADMIN
    );
  }, [userInfo.roleId]);

  const [avatarURL, setAvatarURL] = React.useState(DefaultAvatar);

  const [initialValues, setInitialValues] = React.useState(DEFAULT_VALUE);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: initialValues,
  });

  const { handleEditProfile } = usePostUser();

  const handleSubmitForm = (data) => {
    handleEditProfile({
      ...data,
      avatar: avatarURL,
      dob: data.dob?.format("YYYY-MM-DD"),
      roleName: DataConstants.ROLE_NAME[userInfo.roleId],
      id: userInfo.id,
    });
  };

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
      setAvatarURL(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  useEffect(() => {
    if (userInfo) {
      setInitialValues({
        email: userInfo?.email,
        sex: userInfo?.gender,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        phoneNumber: userInfo?.phone,
        dob: userInfo?.dob ? dayjs(userInfo?.dob) : null,
        address: userInfo?.address,
        username: userInfo?.username,
      });
      setAvatarURL(userInfo?.avata);
    }
  }, [userInfo]);

  return (
    <Grid
      container
      pt={2}
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Grid item xs={3} pt={"50px"}>
        <Tooltip title="Change Avatar" placement="bottom">
          <Box
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
                onChange={handleUploadAvatar}
                disabled={!isStaff}
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
          </Box>
        </Tooltip>
      </Grid>
      <Grid container item xs={9} rowSpacing={2} columnSpacing={2.5}>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"firstName"}
            label={"First Name"}
            required
            rules={{ required: "First name is required" }}
            textfieldProps={{
              error: !!errors.firstName,
              helperText: errors.firstName?.message?.toString() || "",
              disabled: !isStaff,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"lastName"}
            label={"Last Name"}
            required
            rules={{ required: "Last name is required" }}
            textfieldProps={{
              error: !!errors.lastName,
              helperText: errors.lastName?.message?.toString() || "",
              disabled: !isStaff,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"username"}
            label={"Username"}
            required
            rules={{ required: "Username is required" }}
            textfieldProps={{
              disabled: true,
              error: !!errors.username,
              helperText: errors.username?.message?.toString() || "",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            control={control}
            name={"email"}
            label={"Email Address"}
            required
            rules={{ required: "Email is required" }}
            textfieldProps={{
              disabled: true,
              autoComplete: "email",
              type: "email",
              error: !!errors.email,
              helperText: errors.email?.message?.toString() || "",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormDatePicker
            required
            control={control}
            name={"dob"}
            label={"Date of birth"}
            datePickerProps={{
              slotProps: {
                textField: {
                  disabled: !isStaff,
                },
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
            rules={{ required: "Phone Number is required" }}
            textfieldProps={{
              autoComplete: "phoneNumber",
              error: !!errors.phoneNumber,
              helperText: errors.phoneNumber?.message?.toString() || "",
              disabled: !isStaff,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormSelect
            required
            name="sex"
            label="Gender"
            control={control}
            list={DataConstants.GENDER_LIST}
            selectProps={{
              disabled: !isStaff,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <AppFormTextField
            required
            name="address"
            label="Address"
            control={control}
            textfieldProps={{
              disabled: !isStaff,
            }}
          />
        </Grid>
        {isStaff && (
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button variant="contained" color="success" type="submit">
              Update
            </Button>
          </Grid>
        )}
        {/* <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={!isStaff}
          >
            Update
          </Button>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default memo(InfoUpdate);

const DEFAULT_VALUE = {
  email: "",
  sex: DataConstants.GENDER_LIST[0],
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dob: null,
  address: "",
  username: "",
};
