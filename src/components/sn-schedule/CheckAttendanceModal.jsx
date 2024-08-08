import { useEffect, useState } from "react";
import { AppModal } from "../Common";
import { Button, Stack } from "@mui/material";
import CheckAttendanceTable from "./CheckAttendanceTable";
import { AttendanceService } from "src/services";
import { DataConstants } from "src/const";
import useCheckAttend from "./hooks/useCheckAttend";
import { LoadingButton } from "@mui/lab";

const CheckAttendanceModal = ({ data, open, onClose }) => {
  const [dataAttendance, setDataAttendance] = useState(null);
  const [dataSubmit, setDataSubmit] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckAttend = useCheckAttend();

  const handleCloseModal = () => {
    setLoading(false);
    onClose();
    setDataAttendance(null);
    setDataSubmit(null);
  };

  const handleCheckAttendance = (id) => {
    const newData = dataSubmit.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status:
            item.status === DataConstants.STATUS_TYPE.ATTEND
              ? DataConstants.STATUS_TYPE.ABSENT
              : DataConstants.STATUS_TYPE.ATTEND,
        };
      }
      return item;
    });
    setDataSubmit(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        setIsFetching(true);
        const response = await AttendanceService.getAttendClass({
          scheduleId: data?.id,
        });
        setDataAttendance(response?.payload?.data || []);
        setIsFetching(false);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    if (dataAttendance) {
      setDataSubmit(
        dataAttendance?.map((item) => ({
          id: item?.id,
          status:
            item.status === DataConstants.STATUS_TYPE.ATTEND
              ? DataConstants.STATUS_TYPE.ATTEND
              : DataConstants.STATUS_TYPE.ABSENT,
        }))
      );
    }
  }, [dataAttendance]);

  return (
    <AppModal
      open={open}
      onClose={handleCloseModal}
      fullScreen
      modalTitleProps={{ title: "Check Attendance", textAlign: "center" }}
      modalActionsProps={{
        children: (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={() => {
                setLoading(true);
                handleCheckAttend(data?.id, dataSubmit, handleCloseModal);
              }}
            >
              Save
            </LoadingButton>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: (
          <CheckAttendanceTable
            data={dataAttendance}
            onCheckAttend={handleCheckAttendance}
            isFetching={isFetching}
          />
        ),
      }}
    />
  );
};

export default CheckAttendanceModal;
