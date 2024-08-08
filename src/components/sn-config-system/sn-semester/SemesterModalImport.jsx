import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { semesterActions } from "src/redux-store/store";
import { DataConstants } from "src/const";

const ModalContainer = styled("div")({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  borderRadius: "8px",
  zIndex: 1000,
  maxHeight: "80vh",
  overflowY: "auto",
});

const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 999,
});

const SemesterModalImport = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [jsonData, setJsonData] = useState([]);
  const { searchKey } = useSelector((state) => state.semesterReducer);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const parsedDataSemester = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      const filteredDataClass = parsedDataSemester.filter((row) =>
        row.some((cell) => cell !== null && cell !== undefined)
      );
      setJsonData(filteredDataClass);
      console.log("Filtered Number of rows in jsonData:", filteredDataClass);
    };

    reader.readAsArrayBuffer(file);
  };

  const downloadExcel = async () => {
    try {
      const url = "/excel/ImportSemester.xlsx";
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ImportSemester.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file: ", error);
      // You might want to add a notification or error handling here
    }
  };

  const importData = async () => {
    try {
      // Bỏ qua dòng dữ liệu tiêu đề (header)
      const dataSemesterToSend = jsonData.slice(1);

      // Tạo mảng đối tượng mới từ dataToSend
      const formattedDataSemester = dataSemesterToSend.map((row) => ({
        SemesterName: row[0], // Lấy giá trị từ cột Semester Name
        description: row[1], // Lấy giá trị từ cột Description
        status: row[2], // Lấy giá trị từ cột Status
        errorMess: row[3], // Lấy giá trị từ cột Error Message
      }));

      // Gửi dữ liệu lên server
      const response = await fetch(
        "http://localhost:8080/api/v1/semester/import-semester",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedDataSemester),
        }
      );

      if (response.ok) {
        // Xử lý thành công
        dispatch(
          semesterActions.getSemesterList({
            search: searchKey,
            ...DataConstants.PAGINATION_DEFAULT,
          })
        );
        console.log("Data imported successfully!");
        onClose(); // Đóng modal sau khi nhập thành công
      } else {
        // Xử lý lỗi từ phản hồi API
        console.error("Failed to import data:", await response.json());
      }
    } catch (error) {
      console.error("Error importing data:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <Overlay onClick={onClose} />
          <ModalContainer>
            <Box>
              <Typography variant="h5" sx={{ my: 1 }}>
                Import Semester
              </Typography>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1">Sample File: </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadExcel}
                    sx={{ mt: 2, mr: 2, my: 1 }}
                  >
                    Download Sample Excel
                  </Button>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ alignItems: "center", my: 1 }}>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Upload Excel File:
                  </Typography>
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>

              {jsonData.length > 0 && (
                <TableContainer
                  component={Paper}
                  sx={{ mt: 3, maxHeight: "calc(80vh - 240px)" }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {jsonData[0].map((header, index) => (
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              justifyContent: "center",
                            }}
                            key={index}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jsonData.slice(1).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <TableCell
                              sx={{ justifyContent: "center" }}
                              key={cellIndex}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
            <Button variant="contained" onClick={importData} sx={{ mt: 2 }}>
              Import
            </Button>
            <Button variant="contained" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
              Close
            </Button>
          </ModalContainer>
        </>
      )}
    </>
  );
};

export default SemesterModalImport;
