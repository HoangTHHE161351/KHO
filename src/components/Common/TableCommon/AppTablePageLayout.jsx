import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CommonUtils } from "src/utils";

const AppTablePageLayout = ({
  children,
  headerFilter,
  boxPropsSx,
  ...otherProps
}) => {
  const isFunctionChild = typeof children === "function";
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const currentRef = ref.current;
    window.addEventListener("resize", CommonUtils.handleConfigHeightOfTable);
    CommonUtils.handleConfigHeightOfTable();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        entry.target === ref.current && setHeight(entry.contentRect.height);
      }
    });
    ref.current && resizeObserver.observe(ref.current);

    return () => {
      currentRef && resizeObserver.unobserve(currentRef);
      window.removeEventListener(
        "resize",
        CommonUtils.handleConfigHeightOfTable
      );
    };
  }, []);

  return (
    <Box {...otherProps}>
      {headerFilter && (
        <Box ref={ref} pb={2} mx={3} sx={{ ...boxPropsSx }}>
          {headerFilter}
        </Box>
      )}
      {isFunctionChild ? children(height) : children}
    </Box>
  );
};

export default AppTablePageLayout;
