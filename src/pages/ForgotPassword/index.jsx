import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { LockIcon } from "src/assets/icons";
import { AppFormTextField, AppToastNotify } from "src/components/Common";
import { AppConstants } from "src/const";
import usePostVerifyCode from "src/hooks/usePostVerifyCode";

const ForgotPassword = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      code: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const { handleVerifyCode, handleResetPassword } = usePostVerifyCode();

  const { email } = useWatch({ control });

  const handleSendVerifyCode = () => {
    if (!email) {
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.WARNING,
        message: "Please enter your email",
      });
    } else {
      handleVerifyCode(email);
    }
  };

  const handleSubmitData = (data) => {
    const { email, password, passwordConfirm, code } = data;
    if (password !== passwordConfirm) {
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.WARNING,
        message: "Password and Confirm Password do not match",
      });
      return;
    } else {
      handleResetPassword({ email, otp: code, password });
    }
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
          minWidth: 500,
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
            Forgot Password
          </Typography>
        </Stack>
        <Stack
          direction={"column"}
          spacing={"12px"}
          component={"form"}
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <AppFormTextField
            name={"email"}
            label={"Email Address"}
            control={control}
            required
            textfieldProps={{
              type: "email",
            }}
          />
          <Stack direction={"row"} spacing={"8px"} alignItems={"flex-end"}>
            <Box flex={1}>
              <AppFormTextField
                name={"code"}
                control={control}
                label={"Verify Code"}
                required
                sx={{ flex: 1 }}
              />
            </Box>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                minHeight: 45,
              }}
              onClick={handleSendVerifyCode}
            >
              <Typography>Send</Typography>
            </Button>
          </Stack>

          <AppFormTextField
            name={"password"}
            label={"New Password"}
            required
            control={control}
            textfieldProps={{
              type: "password",
            }}
          />
          <AppFormTextField
            name={"passwordConfirm"}
            label={"Confirm Your Password"}
            required
            control={control}
            textfieldProps={{
              type: "password",
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm
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
        </Stack>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
