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
import { importSchedulee } from "src/services/Schedule.service";

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

const ScheduleModalImport = ({ isOpen, onClose }) => {
  const [jsonData, setJsonData] = useState({ data: [], semester: "" });
  const [jsonDataShow, setJsonDataShow] = useState({ data: [], semester: "" });

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Lấy file từ sự kiện
    const reader = new FileReader(); // Tạo một đối tượng FileReader

    reader.onload = (e) => { // Khi file được đọc xong
        const data = new Uint8Array(e.target.result); // Chuyển đổi kết quả đọc được thành Uint8Array
        const workbook = XLSX.read(data, { type: 'array' }); // Đọc file Excel

        const sheetName = workbook.SheetNames[0]; // Lấy tên của sheet đầu tiên
        const worksheet = workbook.Sheets[sheetName]; // Lấy worksheet từ sheet name

        // Chuyển worksheet thành JSON với mỗi hàng là một mảng
        const parsedDataClass = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Chỉ lấy dữ liệu từ cột A đến cột F
        const dataClassFiltered = parsedDataClass.map(row => row.slice(0, 6));

        // Lọc dữ liệu để chỉ giữ lại các hàng có giá trị trong cột A đến F
        const filteredDataClass = dataClassFiltered.filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== ''));

        // Lấy giá trị học kỳ từ ô đầu tiên của hàng đầu tiên
        const semester = filteredDataClass[0][0];

        // Phân loại dữ liệu để gửi lên server và hiển thị
        const dataClassToSend = filteredDataClass.slice(2);
        const dataClassToShow = filteredDataClass.slice(1);

        // Cập nhật trạng thái với dữ liệu đã xử lý
        setJsonData({ data: dataClassToSend, semester });
        setJsonDataShow({ data: dataClassToShow, semester });

        // In ra số lượng hàng của dữ liệu đã lọc
        console.log('Filtered Number of rows in jsonData:', semester);
    };

    reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
};

  const sheetId = "1Yzkl7IIrX-OeUZqyfJP1afok497EtdVypYjZj-bnX_g";
  const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx&id=${sheetId}`;

  const downloadExcel = async () => {
    try {
      const response = await fetch(exportUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Remove the link after download
    } catch (error) {
      console.error("Error downloading Excel file: ", error);
      // You might want to add a notification or error handling here
    }
  };

  const importData = async () => {
    try {
      const { data, semester } = jsonData;

      // Format the data
      const formattedDataClass = data.map((row) => ({
        semester: semester,
        className: row[1],
        teacherCode: row[2],
        subjectCode: row[3], // Lấy giá trị từ cột Room Name
        timeSlot: row[4],
        room: row[5], // Lấy giá trị từ cột Description
      }));

      console.log(formattedDataClass, formattedDataClass.length);
      console.log("+++++++++", semester);
      // Gửi dữ liệu lên server
      const semesterName = semester;
      // Gọi API để gửi dữ liệu lên server
      const response = await importSchedulee(semesterName, formattedDataClass);

      if (response.ok) {
        // Xử lý thành công
        console.log("Data imported successfully!");
        onClose(); // Close modal sau khi nhập thành công
      } else {
        // Xử lý lỗi từ phản hồi API
        console.error("Failed to import data:", await response.json());
      }
    } catch (error) {
      console.error("Error importing data:", error);
      // Bạn có thể thêm thông báo hoặc xử lý lỗi ở đây
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
                Import Schedule
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

              {jsonDataShow.data.length > 0 && (
                <TableContainer
                  component={Paper}
                  sx={{ mt: 3, maxHeight: "calc(80vh - 240px)" }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {jsonDataShow.data[0].map((header, index) => (
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
                      {jsonData.data.map((row, rowIndex) => (
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

export default ScheduleModalImport;
