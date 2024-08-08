import React, { useEffect } from "react";
import { CommonUtils } from "src/utils";
import ResultTable from "./ResultTable";

const Content = ({ data }) => {
  useEffect(() => {
    const tableModalEl = document.querySelector(".table-modal #table");

    const footerModalEl = CommonUtils.getElementById("footer-modal");

    if (tableModalEl && footerModalEl) {
      const footerModalTop = footerModalEl.getBoundingClientRect().top;
      const tableTop = tableModalEl.getBoundingClientRect().top;
      const paginationHeight = 40;

      tableModalEl.style.height =
        footerModalTop - paginationHeight - tableTop - 2 + "px";
    }
  }, []);

  return (
    <div className="table-modal">
      <ResultTable data={data} />
    </div>
  );
};

export default Content;
