import { Dialog, IconButton } from "@mui/material";
import { Fragment, forwardRef, memo } from "react";
import AppModalActions from "./AppModalActions";
import AppModalContent from "./AppModalContent";
import AppModalTitle from "./AppModalTitle";
import { CloseIcon } from "src/assets/icons";

const AppModal = forwardRef(
  (
    {
      sx,
      hasCloseIcon = true,
      modalTitle,
      modalContent,
      modalActions,
      fullScreen,
      actions,
      onClose,
      modalTitleProps = {},
      modalContentProps = {},
      modalActionsProps = {},
      closeIconProps = {},
      ...otherProps
    },
    ref
  ) => {
    const { content, ...otherModalContentProps } = modalContentProps;
    const { title, ...otherModalTitleProps } = modalTitleProps;
    const { children: dialogActionsChildren, ...otherDialogActionsProps } =
      modalActionsProps;
    const {
      sx: closeIconSx,
      customIcon,
      ...otherCloseIconProps
    } = closeIconProps;

    return (
      <Dialog
        ref={ref}
        id="modal-customer"
        scroll="paper"
        fullScreen={fullScreen}
        sx={{
          inset: fullScreen ? 32 : 0,
          "& .MuiDialog-paper": {
            minWidth: 450,
            borderRadius: "10px",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.25)",
            padding: "24px 0px",
          },
          ...sx,
        }}
        disableEnforceFocus
        {...otherProps}
      >
        {hasCloseIcon && (
          <IconButton
            sx={{
              position: "absolute",
              top: 22,
              right: 16,
              fontSize: 16,
              ...closeIconSx,
            }}
            onClick={onClose}
            {...otherCloseIconProps}
          >
            {customIcon || <CloseIcon />}
          </IconButton>
        )}

        {modalTitle ?? (
          <AppModalTitle {...otherModalTitleProps}>{title}</AppModalTitle>
        )}

        {modalContent ?? (
          <AppModalContent {...otherModalContentProps}>
            {content}
          </AppModalContent>
        )}

        {modalActions ??
          (actions || dialogActionsChildren ? (
            <AppModalActions {...otherDialogActionsProps}>
              {actions || dialogActionsChildren}
            </AppModalActions>
          ) : (
            <Fragment />
          ))}
      </Dialog>
    );
  }
);

export default memo(AppModal);
