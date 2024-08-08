import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { AppFormTextField } from "../Common";
import { LoadingButton } from "@mui/lab";
import usePostVerifyCode from "src/hooks/usePostVerifyCode";

const ChangePasswordForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  const { handleVerifyChangePassword, handleChangePassword } =
    usePostVerifyCode();

  const handleSendVerify = () => {
    setLoading(true);
    handleVerifyChangePassword();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <Stack
      direction={"column"}
      spacing={"12px"}
      component={"form"}
      width={"40%"}
      mx={"auto"}
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <Stack direction={"row"} spacing={"8px"} alignItems={"flex-end"}>
        <Box flex={1}>
          <AppFormTextField
            name={"otp"}
            control={control}
            label={"Verify Code"}
            required
            rules={{ required: "Verify code is required" }}
            sx={{ flex: 1 }}
            textfieldProps={{
              error: !!errors?.otp,
              helperText: errors?.otp?.message?.toString() || "",
            }}
          />
        </Box>
        <LoadingButton
          variant="outlined"
          color="inherit"
          sx={{
            minHeight: 45,
          }}
          loading={loading}
          onClick={handleSendVerify}
        >
          <Typography>Send to Email</Typography>
        </LoadingButton>
      </Stack>

      <AppFormTextField
        name={"oldPassword"}
        label={"Old Password"}
        required
        rules={{
          required: "Old password is required",
          maxLength: {
            value: 20,
            message: "Password must be less than 20 characters",
          },
        }}
        control={control}
        textfieldProps={{
          type: "password",
          error: !!errors?.oldPassword,
          helperText: errors?.oldPassword?.message?.toString() || "",
        }}
      />
      <AppFormTextField
        name={"newPassword"}
        label={"New Password"}
        required
        rules={{
          required: "New password is required",
          maxLength: {
            value: 20,
            message: "Password must be less than 20 characters",
          },
        }}
        control={control}
        textfieldProps={{
          type: "password",
          error: !!errors?.newPassword,
          helperText: errors?.newPassword?.message?.toString() || "",
        }}
      />
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{
            py: "8px",
            mt: 1,
          }}
        >
          Update
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChangePasswordForm;
