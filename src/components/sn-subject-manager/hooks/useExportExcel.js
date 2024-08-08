import { AppToastNotify } from "src/components/Common";
import { ApiConstants, AppConstants, EnvConstants } from "src/const";
import { SubjectService } from "src/services";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const useExportExcel = () => {
  const handleExportExcel = async (data, fileName) => {
    try {
      const response = await SubjectService.exportSubjectService(data);
      if (response.status === ApiConstants.STT_OK) {
        const blob = new Blob([response.data], {
          type: AppConstants.ACCEPT_FILE_TYPE,
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.SUCCESS,
          message: "Export Excel Success!",
        });
        return response.data;
      } else {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: response?.message || "An error occurred!",
        });
        return;
      }
    } catch (error) {
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    }
  };

  const handleCreateExcel = ({
    sheetId = "sheet-id",
    tableName,
    fileName = "file.xlsx",
    options,
    columns = [],
    rows = [[]],
    rowHeight,
    hasTemplate = true,
    onCustomWorkSheet,
  }) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetId, options);

    // Xử lý header
    worksheet.columns = columns.map((item) => ({
      width: item.width,
      key: item.key,
    }));

    const startColumn = hasTemplate ? 6 : 1;
    const column = worksheet.insertRow(
      startColumn,
      columns.map((item) => item.name)
    );
    column.eachCell((header, index) => {
      const myStyle = columns[index - 1]?.style;
      header.style = getStyleWithDefault(DEFAULT_HEADER_STYLE, myStyle);
    });

    // Xử lý row
    if (rows.length) {
      worksheet.addRow(rows[0]);
      const row = worksheet.getRow(worksheet.rowCount);
      if (rowHeight) {
        row.height = rowHeight;
      }
      row.eachCell((cell, index) => {
        const myStyle = columns[index - 1]?.style;
        cell.style = getStyleWithDefault(DEFAULT_ROW_STYLE, myStyle);
      });
      rows.slice(1).forEach((item) => {
        worksheet.addRow(item, "i");
      });
    } else if (hasTemplate) {
      worksheet.addRow(["No data!"]);
      worksheet.mergeCells(
        worksheet.rowCount,
        1,
        worksheet.rowCount,
        columns.length
      );
      worksheet.getRow(worksheet.rowCount).alignment = {
        horizontal: "center",
      };
    }
    if (hasTemplate) {
      // Tạo template form
      createTemplateFileExcel({
        worksheet,
        tableName,
        totalColumn: columns.length,
      });
    }

    if (onCustomWorkSheet) {
      onCustomWorkSheet(worksheet, workbook);
    }

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        saveAs(new Blob([buffer]), fileName);
      })
      .catch(() => {
        AppToastNotify({
          type: AppConstants.NOTIFY_TYPE.ERROR,
          message: "Xuất file excel thất bại!",
        });
      });
  };

  const handleReadExcel = async ({
    file,
    objectMapping,
    metaId,
    metaValue,
  }) => {
    try {
      const data = await handleLoadExcel({
        file,
        objectMapping,
        metaId,
        metaValue,
      });

      return data;
    } catch (error) {
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error.message || "An error occurred!",
      });

      return null;
    }
  };

  return { handleExportExcel, handleReadExcel, handleCreateExcel };
};

const createTemplateFileExcel = ({ worksheet, totalColumn, tableName }) => {
  worksheet.spliceRows(1, 3, [], [tableName.toUpperCase()]);

  worksheet.mergeCells(3, 1, 3, totalColumn);
  worksheet.mergeCells(1, 1, 1, totalColumn);
  worksheet.mergeCells(2, 1, 2, totalColumn);
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1 || rowNumber === 2 || rowNumber === 3) {
      row.font = {
        size: 16,
        bold: true,
        name: "Times New Roman",
      };
      row.height = 25;
    } else if (rowNumber === 5) {
      row.font = {
        size: 14,
        bold: true,
        name: "Times New Roman",
      };
      row.alignment = {
        wrapText: true,
        vertical: "middle",
        horizontal: "center",
      };
    } else if (rowNumber >= 4) {
      return false; // Thoát khỏi vòng lặp khi đến dòng 6
    }
  });
};

const handleLoadExcel = async ({ file, objectMapping, metaId, metaValue }) => {
  const wb = new ExcelJS.Workbook();
  const reader = new FileReader();
  const list = [];

  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx
        .load(buffer)
        .then((workbook) => {
          let isCreatedByExcelJS = false;

          const metadataSheet = wb.getWorksheet(metaId);
          if (
            metadataSheet &&
            metadataSheet.getCell("A1").value === metaValue
          ) {
            isCreatedByExcelJS = true;
          }
          if (!isCreatedByExcelJS && metaId && metaValue) {
            reject({
              message: "File không hợp lệ!",
            });
          }

          workbook.eachSheet((sheet, id) => {
            sheet.eachRow((row, rowIndex) => {
              if (rowIndex > 1 && id === 1) {
                let data = {};
                objectMapping.forEach((item) => {
                  data[item.key] =
                    row.getCell(item.valueIndex).value?.toString() || "";
                });

                list.push(data);
              }
            });
          });

          resolve(list);
        })
        .catch((error) => {
          reject(error);
        });
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export default useExportExcel;

const DEFAULT_HEADER_STYLE = {
  alignment: {
    vertical: "middle",
  },
  font: {
    bold: true,
    name: "Times New Roman",
  },
  border: {
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
  },
};

const DEFAULT_ROW_STYLE = {
  alignment: {
    wrapText: true,
    vertical: "middle",
  },
  font: {
    name: "Times New Roman",
  },
  border: {
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
  },
};

const getStyleWithDefault = (defaultStyle, myStyle) => {
  return {
    alignment: {
      ...defaultStyle?.alignment,
      ...myStyle?.alignment,
    },
    border: {
      ...defaultStyle?.border,
      ...myStyle?.border,
    },
    font: {
      ...defaultStyle?.font,
      ...myStyle?.font,
    },
  };
};
