import { memo } from "react";
import AppHeaderCell from "./AppHeaderCell";

const AppIndexHeader = () => {
  return (
    <AppHeaderCell
      style={{ minWidth: 60, width: 60, maxWidth: 60 }}
      align="center"
    >
      No
    </AppHeaderCell>
  );
};

export default memo(AppIndexHeader);
