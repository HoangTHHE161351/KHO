import React, { memo } from "react";
import { Button } from "@mui/material";
import { AppModal } from "..";

const AppConfirmModal = ({
  onClose,
  onCancel,
  onConfirm,
  labelCancel = "Cancel",
  labelConfirm = "Confirm",
  ...otherProps
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AppModal
      onClose={onClose}
      modalActionsProps={{
        children: (
          <>
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              {labelCancel}
            </Button>
            <Button onClick={handleConfirm} variant="contained">
              {labelConfirm}
            </Button>
          </>
        ),
      }}
      {...otherProps}
    />
  );
};

export default memo(AppConfirmModal);
