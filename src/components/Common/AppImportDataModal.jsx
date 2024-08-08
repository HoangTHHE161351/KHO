import { Button, Stack, Typography } from "@mui/material";
import { AppConfirmModal, AppModal } from ".";
import { UploadIcon } from "src/assets/icons";
import { AppConstants } from "src/const";
import { useMemo, useState } from "react";
import useHandleExcel from "src/hooks/useHandleExcel";

const ImportExcelModal = ({
  fileName,
  tableName,
  onClose,
  headerExcel,
  fields,
  ...otherProps
}) => {
  const [excelFile, setExcelFile] = useState(null);
  const [validResArr, setValidResArr] = useState([]);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const { handleExportExcel, handleReadExcel } = useHandleExcel();
  //   const handleValidData = useValidBookClassification();
  //   const insertMultiData = useInsertMultiBookClassification();

  const dataVerified = useMemo(
    () =>
      validResArr
        .filter((item) => item.validateResult === true)
        .map((item) => ({
          code: item.code,
          name: item.name,
          note: item.note,
        })),
    [validResArr]
  );

  const handleClose = () => {
    onClose();
    setValidResArr([]);
    setExcelFile(null);
  };

  const downloadTemplateFile = () => {
    handleExportExcel({
      fileName: fileName,
      tableName: tableName,
      columns: headerExcel,
      hasTemplate: false,
      onCustomWorkSheet: customWorkSheet,
    });
  };

  const handleChangeFile = (event) => {
    const newFile = event.target.files[0];
    setExcelFile(newFile || null);
  };
  const handleUploadFile = async () => {
    if (excelFile) {
      const data = await handleReadExcel({
        file: excelFile,
        metaId: META_ID,
        metaValue: META_VALUE,
        objectMapping: [
          {
            key: "code",
            valueIndex: 1,
          },
          {
            key: "name",
            valueIndex: 2,
          },
          {
            key: "note",
            valueIndex: 3,
          },
        ],
      });
      if (!data) return;
      //   const result = await handleValidData(data);
      //   if (result) {
      //     setValidResArr(result);
      //   }
    }
  };

  const handleSubmitData = async () => {
    // const result = await insertMultiData(dataVerified);
    // if (result) {
    //   handleClose();
    // }
  };

  return (
    <AppModal
      onClose={handleClose}
      modalContentProps={{
        content: (
          <Stack pt={0.5} spacing={1} px={3}>
            <Typography>
              Tải file mẫu nhập Bảng phân loại sách từ Excel tại
              <Typography
                sx={{ cursor: "pointer" }}
                ml={0.5}
                fontWeight={500}
                component="span"
                color="primary.main"
                onClick={downloadTemplateFile}
              >
                đây
              </Typography>
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontStyle: "italic",
                textDecoration: "underline",
              }}
            >
              Lưu ý:
            </Typography>
            <Typography component="li" ml={3}>
              1. Các cột tiêu đề mầu đỏ trong file mẫu là bắt buộc nhập
            </Typography>
            <Typography component="li" ml={3}>
              2. Không thay đổi, thêm, xóa các cột trong file mẫu
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              {...otherProps}
            >
              <Button
                size="small"
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
              >
                Chọn file
                <input
                  style={{ fontSize: 12 }}
                  type="file"
                  accept={`${AppConstants.EXCEL_FILE_TYPE},${AppConstants.ACCEPT_FILE_TYPE}`}
                  hidden
                  onInput={handleChangeFile}
                />
              </Button>
              {excelFile && (
                <>
                  <Typography>{excelFile.name}</Typography>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleUploadFile}
                  >
                    Tải lên
                  </Button>
                </>
              )}
            </Stack>
            {/* <Content data={validResArr} /> */}
            <AppConfirmModal
              modalTitleProps={{
                title: `Bạn xác nhận thêm ${dataVerified.length} phân loại sách thỏa mãn từ file excel?`,
              }}
              open={isOpenConfirm}
              onClose={() => {
                setIsOpenConfirm(false);
              }}
              onCancel={() => {
                setIsOpenConfirm(false);
              }}
              onConfirm={handleSubmitData}
            />
          </Stack>
        ),
      }}
      modalActionsProps={{
        children: (
          <>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={!dataVerified.length}
              variant="contained"
              onClick={() => setIsOpenConfirm(true)}
            >
              Save
            </Button>
          </>
        ),
      }}
      fullScreen
      modalTitleProps={{
        title: "Nhập bảng phân loại sách từ file excel",
      }}
      {...otherProps}
    />
  );
};

export default ImportExcelModal;

const META_ID = "Metadata";
const META_VALUE = "Metadata";

const customWorkSheet = (workSheet, workbook) => {
  const hiddenSheet = workbook.addWorksheet(META_ID);
  hiddenSheet.state = "hidden";
  hiddenSheet.getCell("A1").value = META_VALUE;
  workSheet.columns.map((item) => {
    item.alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "left",
    };
    item.border = {
      top: {
        style: "thin",
      },
      left: {
        style: "thin",
      },
      right: {
        style: "thin",
      },
      bottom: {
        style: "thin",
      },
    };
  });

  workSheet.eachRow((item, index) => {
    if (index === 1) {
      item.height = 40;
      item.eachCell((cell, index) => {
        cell.font = {
          size: 16,
          bold: true,
          color: { argb: index === 3 ? "00000" : "fd0000" },
        };
      });
    }
  });
};
