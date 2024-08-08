import {
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { LockIcon } from "src/assets/icons";

const index = () => {
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
            Reset Password
          </Typography>
        </Stack>
        <Stack
          direction={"column"}
          spacing={"12px"}
          component="form"
          // onSubmit={handleSubmit}
        >
          <TextField
            label={"New Password"}
            required
            fullWidth
            type="password"
          />
          <TextField
            label={"Confirm New Password"}
            required
            fullWidth
            type="password"
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

export default index;
