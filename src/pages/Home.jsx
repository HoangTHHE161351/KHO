import React from "react";
import {
  callModelAPI,
  sendLoadScheduleRq,
} from "src/services/TaskOther.service";

const Home = () => {
  const callModelingApi = async () => {
    try {
      const response = await callModelAPI();
      console.log("API call to modeling endpoint successful");
      console.log(response.data); // Log response data if needed
    } catch (error) {
      console.error("Error calling modeling API:", error);
    }
  };

  const sendLoadScheduleRequest = async () => {
    try {
      const response = await sendLoadScheduleRq();
      console.log("API call to schedule request endpoint successful");
      console.log(response.data); // Log response data if needed
    } catch (error) {
      console.error("Error sending load schedule request:", error);
    }
  };

  return (
    <div>
      <div>Home Component</div>
      <button onClick={callModelingApi}>
        Add feature_face to Facial records
      </button>
      <button onClick={sendLoadScheduleRequest}>
        Update personaType on LCD for users
      </button>
    </div>
  );
};

export default Home;
