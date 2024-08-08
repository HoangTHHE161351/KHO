// RoomLog.jsx
import React from "react";
import { useParams } from "react-router-dom";

const RoomLog = () => {
  const { roomName } = useParams();

  // Lấy dữ liệu từ roomId, có thể từ API hoặc context
  // Ví dụ: const roomData = fetchRoomData(roomId);

  return (
    <div>
      <h1>Room Log for Room: {roomName}</h1>
      {/* Hiển thị thông tin chi tiết của phòng ở đây */}
    </div>
  );
};

export default RoomLog;
