import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LockIcon } from "src/assets/icons";
import { AppFormTextField, AppToastNotify } from "src/components/Common";
import useAuth from "src/components/sn-layout/hooks/useAuth";
import { AppConstants, EnvConstants } from "src/const";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const { handleLoginRequest } = useAuth();

  const handleSubmitForm = async (data) => {
    setLoading(true);
    try {
      await handleLoginRequest({
        username: data.username,
        password: data.password,
      });
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

  const Layout = ({ children }) => <>{children}</>;

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          height: "100vh",
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
              Sign In
            </Typography>
          </Stack>
          <Grid
            container
            component="form"
            onSubmit={handleSubmit(handleSubmitForm)}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12}>
              <AppFormTextField
                control={control}
                name={"username"}
                label={"Username"}
                required
                rules={{ required: "Username is required" }}
                textfieldProps={{
                  margin: "normal",
                  autoComplete: "username",
                  error: !!errors.username,
                  helperText: errors.username?.message?.toString() || "",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <AppFormTextField
                control={control}
                name={"password"}
                label={"Password"}
                required
                rules={{ required: "Password is required" }}
                textfieldProps={{
                  margin: "normal",
                  autoComplete: "current-password",
                  type: "password",
                  error: !!errors.password,
                  helperText: errors.password?.message?.toString() || "",
                }}
              />
            </Grid>

            <Stack
              width={"100%"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Link
                to={"/forgot-password"}
                variant="body2"
                color="info.lighter"
              >
                Forgot password?
              </Link>
            </Stack>
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={0.5}
              width={"100%"}
              height={"100%"}
            >
              {/* <Typography>Don't have an account?</Typography>
              <Link variant="body2" to={"/register"}>
                Sign Up
              </Link> */}
            </Stack>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;

const DEFAULT_VALUE = {
  username: "",
  password: "",
};
