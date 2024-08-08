import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
  console.log("===============", userInfo);
  return <div>HomePage</div>;
};

export default HomePage;
