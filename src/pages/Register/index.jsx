import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LockIcon } from "src/assets/icons";
import {
  AppFormDatePicker,
  AppFormSelect,
  AppFormTextField,
} from "src/components/Common";
import { authActions } from "src/redux-store/store";
import DefaultAvatar from "src/assets/images/user-default.png";
import { DataConstants } from "src/const";

const Register = () => {
  const dispatch = useDispatch();
  const [avatarURL, setAvatarURL] = useState(DefaultAvatar);
  const [avatar, setAvatar] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const handleSubmitData = (data) => {
    dispatch({
      type: authActions.requestRegister.type,
      payload: {
        ...data,
        avatar: avatar,
        roleName: "ADMIN",
        dob: data.dob.format("YYYY-MM-DD"),
      },
    });
  };

  const getBase64 = (fileInput) => {
    let reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setAvatar(reader.result);
    };
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={1}
        square
        sx={{
          p: 5,
          minWidth: 900,
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={2}
        >
          <Avatar
            sx={{
              backgroundColor: "error.main",
            }}
          >
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
        </Stack>

        <Grid
          container
          component="form"
          onSubmit={handleSubmit(handleSubmitData)}
          columnSpacing={"16px"}
        >
          <Grid item xs={3}>
            <Tooltip title="Upload Avatar" placement="bottom">
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
                    onChange={(e) => {
                      setAvatarURL(URL.createObjectURL(e.target.files[0]));
                      getBase64(e.target.files[0]);
                    }}
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
          <Grid container item xs={9} rowSpacing={"12px"} columnSpacing={"8px"}>
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
                  error: !!errors.username,
                  helperText: errors.username?.message?.toString() || "",
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
              <AppFormTextField
                control={control}
                name={"password"}
                label={"Password"}
                required
                rules={{ required: "Password is required" }}
                textfieldProps={{
                  autoComplete: "current-password",
                  type: "password",
                  error: !!errors.password,
                  helperText: errors.password?.message?.toString() || "",
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
                  autoComplete: "email",
                  type: "email",
                  error: !!errors.email,
                  helperText: errors.email?.message?.toString() || "",
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
              />
            </Grid>
            <Grid item xs={12}>
              <AppFormTextField
                required
                name="address"
                label="Address"
                control={control}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={0.5}
              width={"100%"}
              height={"100%"}
            >
              <Typography>You have an account?</Typography>
              <Link variant="body2" to={"/login"}>
                Sign In
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;

const DEFAULT_VALUE = {
  email: "",
  password: "",
  sex: DataConstants.GENDER_LIST[0].id,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dob: null,
  address: "",
  username: "",
};
