import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, CircularProgress
} from "@mui/material";
import { getDetailLoggedUser } from "src/services/Room.service";
import { AppConstants, EnvConstants } from "src/const";
import { AppToastNotify } from "../Common";

//TODO: Check and validate data, remap for show user detail

const LogDetailModal = ({ isVisible, onCloseModal, date, dataView, userData }) => {
  const [detailUser, setDetailUser] = useState(null);
  const [leftSelectInfo, setLeftSelectInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const getDetailUser = async () => {
    setIsFetching(true);
    try {
      console.log('dataView: ', dataView);
      const params = {
        userName: dataView?.userName,
        date: date,
        roomId: dataView?.roomId
      };
      console.log('Param: ', params);

      const { data } = await getDetailLoggedUser({ params });
      if (data) {
        console.log("=-------> user log response : ", data);
        setDetailUser(data?.data);
      }
    } catch (error) {
      //TODO: handle error
      EnvConstants.IS_DEV && console.log(error);
      AppToastNotify({
        type: AppConstants.NOTIFY_TYPE.ERROR,
        message: error?.response?.data?.message || "An error occurred!",
      });
    }
    setIsFetching(false);
  }
  useEffect(() => console.log('FaceImage: ', leftSelectInfo?.faceImage), [leftSelectInfo])

  useEffect(() => {
    if (isVisible) {
      getDetailUser();
    }
  }, [isVisible])
  const handleRowClick = (data, index) => {
    console.log('Data Selected : ', data);
    setLeftSelectInfo(data);
    setSelectedRow(index)
  }
  return (
    <Modal open={isVisible} onClose={onCloseModal} >

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "row",
          width: '80%',
          height: '80%',
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 1, marginRight: 2, display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>

          <img
            src={`${leftSelectInfo?.faceImage}`}
            alt={userData?.userName}
            style={{ width: "100%", borderRadius: "8px", alignContent: "center" }}
          />
          <Typography variant="h6" align="center" sx={{ mt: 2, width: "100%", height: "20%", color: '#333' }}>
            {leftSelectInfo?.userName}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ flex: 2 }} >
          <TableContainer component={Paper} style={{ maxHeight: '100%' }}>
            <Table>
              <TableHead>
                <TableRow >
                  {/* <TableCell></TableCell> */}
                  <TableCell >No</TableCell>
                  <TableCell >Room</TableCell>
                  <TableCell >Time</TableCell>
                  <TableCell >Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ height: "100%" }}>
                      <CircularProgress sx={{ color: 'primary.main', height: "100%" }} size={40} />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {detailUser && detailUser.length && detailUser.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          cursor: 'pointer',
                          '&.Mui-selected': {
                            backgroundColor: '#f0f0f0',
                            '&:hover': {
                              backgroundColor: '#e0e0e0',
                            },
                          },
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                          height: '100%',
                        }}
                        selected={selectedRow === index}
                        onClick={() => handleRowClick(row, index)}
                      >
                        <TableCell>{row?.id}</TableCell>
                        <TableCell>{row?.roomName}</TableCell>
                        <TableCell>{row?.time}</TableCell>
                        <TableCell>{row?.check}</TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogDetailModal;
