import { Button, Stack } from "@mui/material";
import ResultTable from "./ResultTable";
import { AppTablePageLayout } from "src/components/Common/TableCommon";
import { AppModal, AppToastNotify } from "src/components/Common";
import { useState } from "react";
import { SemesterService } from "src/services";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import * as XLSX from "xlsx";
import dayjs from "dayjs";

const ImportModal = ({ open, onClose, onSuccess }) => {
  const [resultData, setResultData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchImportData = async () => {
    setIsFetching(true);
    try {
      const response = await SemesterService.importSemester(resultData);

      if (response.status === ApiConstants.STT_OK) {
        setResultData(response.data?.data);
        onSuccess();
      } else {
        throw new Error(response.data?.message || "An error occurred!");
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const downloadExcel = () => {
    try {
      const url = "/excel/ImportSemester.xlsx";
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ImportSemester.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      EnvConstants.IS_DEV && console.error(error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const parsedDataClass = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const filteredDataClass = parsedDataClass
        .map((row) => row.slice(0, 4))
        ?.slice(1)
        ?.filter((row) =>
          row.some((cell) => cell !== null && cell !== undefined)
        );

      const formattedDataClass = filteredDataClass.map((row) => {
        const startTimeDate = new Date(
          Math.round((row[1] - 25569) * 86400 * 1000)
        );
        const endTimeDate = new Date(
          Math.round((row[2] - 25569) * 86400 * 1000)
        );

        return {
          semesterName: row[0],
          startTime: dayjs(startTimeDate)?.format(AppConstants.DATE_FORMAT),
          endTime: dayjs(endTimeDate)?.format(AppConstants.DATE_FORMAT),
          description: row[3],
        };
      });

      setResultData(formattedDataClass);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <AppModal
      open={open}
      onClose={() => {
        onClose();
        setResultData([]);
      }}
      fullScreen
      modalTitleProps={{
        title: "Import Excel",
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                onClose();
                setResultData([]);
              }}
            >
              Cancel
            </Button>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={fetchImportData}
            >
              Import
            </Button>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: (
          <Stack direction={"column"} spacing={1}>
            <AppTablePageLayout
              headerFilter={
                <Stack
                  direction={"row"}
                  justifyContent={"flex-end"}
                  spacing={1}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadExcel}
                  >
                    Download File
                  </Button>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    id="contained-button-file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Choose File
                    </Button>
                  </label>
                </Stack>
              }
            >
              <ResultTable data={resultData} isFetching={isFetching} />
            </AppTablePageLayout>
          </Stack>
        ),
      }}
    />
  );
};

export default ImportModal;
