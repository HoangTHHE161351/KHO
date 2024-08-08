import { Button, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { AppFormTextField } from "../Common";
import { useForm } from "react-hook-form";
import useLoginDevice from "./hooks/useLoginDevice";
import useLogoutDevice from "./hooks/useLogoutDevice";

const LoginHardDiskPanel = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: DEFAULT_VALUE });

  const handleLoginDevice = useLoginDevice();
  const handleLogoutDevice = useLogoutDevice();

  const handleSubmitForm = (data) => {
    handleLoginDevice(data, () => reset());
  };

  return (
    <Stack
      direction={"column"}
      spacing={"12px"}
      component={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
      width={"40%"}
      mx={"auto"}
      bgcolor={"common.white"}
      px={"24px"}
      py={"16px"}
      borderRadius={"8px"}
    >
      <Typography fontSize={20} fontWeight={600} textAlign={"center"}>
        Login Device
      </Typography>
      <AppFormTextField
        control={control}
        name={"ip"}
        label={"IP"}
        required
        rules={{
          required: "Vui lòng nhập IP",
        }}
        textfieldProps={{
          error: !!errors?.ip,
          helperText: errors?.ip?.message,
        }}
      />
      <AppFormTextField
        control={control}
        name={"port"}
        label={"Port"}
        required
        rules={{
          required: "Vui lòng nhập Port",
        }}
        textfieldProps={{
          error: !!errors?.port,
          helperText: errors?.port?.message,
        }}
      />
      <AppFormTextField
        control={control}
        name={"user"}
        label={"User"}
        required
        rules={{
          required: "Vui lòng nhập User Name",
        }}
        textfieldProps={{
          error: !!errors?.user,
          helperText: errors?.user?.message,
        }}
      />
      <AppFormTextField
        control={control}
        name={"password"}
        label={"Password"}
        required
        rules={{
          required: "Vui lòng nhập Password",
        }}
        textfieldProps={{
          type: "password",
          error: !!errors?.password,
          helperText: errors?.password?.message,
        }}
      />
      <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
        <Button variant="contained" color="warning" onClick={() => reset()}>
          Reset
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleLogoutDevice()}
        >
          Logout
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(LoginHardDiskPanel);

const DEFAULT_VALUE = {
  ip: "",
  port: "",
  user: "",
  password: "",
};
