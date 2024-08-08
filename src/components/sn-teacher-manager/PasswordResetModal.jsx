import React, { memo } from "react";
import { AppModal, AppTextField } from "../Common";
import { Button } from "@mui/material";
import usePostTeacher from "./hooks/usePostTeacher";

const PasswordResetModal = ({ userName, open, onClose }) => {
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { handleSetNewPassword } = usePostTeacher();

  const handleChangePassword = () => {
    if (password) {
      handleSetNewPassword({ userName, newPass: password });
      onClose();
    } else {
      setErrorMessage("Vui lòng nhập mật khẩu mới");
    }
  };

  return (
    <AppModal
      onClose={onClose}
      open={open}
      modalTitleProps={{
        title: "Reset Password",
      }}
      modalActionsProps={{
        children: (
          <>
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleChangePassword}
              variant="contained"
              name="action"
            >
              Save
            </Button>
          </>
        ),
      }}
      modalContentProps={{
        content: (
          <AppTextField
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            inputProps={{
              placeHolder: "New Password",
            }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        ),
        sx: { px: 3 },
      }}
    />
  );
};

export default memo(PasswordResetModal);
