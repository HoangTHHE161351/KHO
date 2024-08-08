import {
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockIcon } from "src/assets/icons";
import { AppFormTextField, AppToastNotify } from "src/components/Common";
import { usePostUser } from "src/components/sn-user-manager";
import { AppConstants, PathConstants } from "src/const";
import { userActions } from "src/redux-store/store";

const ActiveUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { userProfile } = useSelector((state) => state.userReducer);

  const { handleActiveUser } = usePostUser();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmitData = (data) => {
    const { password, passwordConfirm } = data;
    if (password !== passwordConfirm) {
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.WARNING,
        message: "Password and Confirm Password do not match",
      });
      return;
    } else {
      handleActiveUser(
        { email: userProfile.email, password: data.password },
        () => navigate(PathConstants.LOGIN)
      );
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(
        userActions.getUserByToken({
          token,
          onError: () => navigate(PathConstants.LOGIN),
        })
      );
    } else {
      navigate(PathConstants.LOGIN);
    }
  }, [token, dispatch, navigate]);

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
            Active Account
          </Typography>
        </Stack>
        <Stack
          direction={"column"}
          spacing={"12px"}
          component={"form"}
          onSubmit={handleSubmit(handleSubmitData)}
        >
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
        </Stack>
      </Paper>
    </Container>
  );
};

export default ActiveUser;
