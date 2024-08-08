import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { ApiConstants, EnvConstants, PathConstants } from "./const";
import { useDispatch } from "react-redux";
import { authActions } from "./redux-store/store";

const PublicAuthentication = () => {
  const dispatch = useDispatch();
  const accessToken = Cookies.get(ApiConstants.ACCESS_TOKEN);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!accessToken) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080${ApiConstants.PROFILE}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const responseData = await response.json();

        if (responseData.code === ApiConstants.STT_OK) {
          const userInfo = responseData.data.data;
          dispatch(authActions.getUserProfileSuccess(userInfo));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        EnvConstants.IS_DEV && console.log(error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [accessToken, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (isLoggedIn) {
    return <Navigate to={PathConstants.ROOT} />;
  }

  return <Outlet />;
};

export default PublicAuthentication;
