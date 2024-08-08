import React, { memo } from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = () => {
  return (
    <>
      <AppIndexCell />
      {HEADER_CELL.map((cell) => (
        <AppHeaderCell
          key={cell.id}
          align={cell.align}
          className={cell.className}
          sx={{
            width: cell.width,
          }}
        >
          {cell.label}
        </AppHeaderCell>
      ))}
    </>
  );
};

export default memo(HeaderTable);

const HEADER_CELL = [
  {
    id: "subjectCode",
    label: "Subject Code",
    align: "left",
  },
  {
    id: "curriculumName",
    label: "Curriculum Name",
    align: "left",
  },
  {
    id: "semesterNo",
    label: "Semester No",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "center",
  },
  {
    id: "error",
    label: "Error",
    align: "center",
    width: 250,
  },
];
