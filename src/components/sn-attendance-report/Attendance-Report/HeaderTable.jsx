import React, { memo } from "react";
import { AppHeaderCell, AppIndexCell } from "src/components/Common/TableCommon";

const HeaderTable = () => {
  return (
    <>
      <AppIndexCell />
      {HeaderCell.map((column) => {
        return (
          <AppHeaderCell
            key={column.id}
            align={column.align}
            className={column.className}
          >
            {column.label}
          </AppHeaderCell>
        );
      })}
    </>
  );
};

export default memo(HeaderTable);

const HeaderCell = [
  {
    id: "room",
    label: "Room",
    align: "left",
  },
  {
    id: "day",
    label: "Day",
    align: "left",
  },
  {
    id: "learnDate",
    label: "Learn Date",
    align: "left",
  },

  {
    id: "teacherCode",
    label: "Teacher Code",
    align: "left",
  },
  {
    id: "className",
    label: "Class Name",
    align: "left",
  },
  {
    id: "subjectCode",
    label: "Subject Code",
    align: "left",
  },
  {
    id: "slot",
    label: "Slot",
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  }
];
