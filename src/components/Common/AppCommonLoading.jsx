import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef, memo } from "react";

const AppCommonLoading = forwardRef(({ isFetching = false }, ref) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 11111111111111 }}
      //sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isFetching}
      ref={ref}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});

AppCommonLoading.propTypes = {
  isFetching: PropTypes.bool,
};

export default memo(AppCommonLoading);
