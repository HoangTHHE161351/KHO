import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { AppToastNotify } from "src/components/Common";
import { AppConstants } from "src/const";

const useHandleExcel = () => {
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
        message: error.message || "Đã có lỗi xảy ra!",
      });
      return null;
    }
  };

  const handleExportExcel = ({
    sheetId = "sheet-id",
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

    const startColumn = 1;
    const column = worksheet.insertRow(
      startColumn,
      columns.map((item) => item.name)
    );
    column.eachCell((header, index) => {
      const myStyle = columns[index - 1]?.style;
      header.style = getStyleWithDefault(DEFAULT_HEADER_STYLE, myStyle);
      header.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "92D050" },
      };
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
  return { handleExportExcel, handleReadExcel };
};

const createTemplateFileExcel = ({ worksheet }) => {
  worksheet.eachRow((row) => {
    row.font = {
      bold: true,
      name: "Times New Roman",
    };
    row.alignment = {
      wrapText: true,
      vertical: "middle",
    };
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

export default useHandleExcel;

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
