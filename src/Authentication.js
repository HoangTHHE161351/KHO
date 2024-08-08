import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ApiConstants, EnvConstants, PathConstants } from "./const";
import { useDispatch } from "react-redux";
import { authActions } from "./redux-store/store";
import { AppCommonLoading } from "./components/Common";

const Authentication = ({ roles = [] }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const accessToken = Cookies.get(ApiConstants.ACCESS_TOKEN);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
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

          if (response.status === ApiConstants.STT_OK) {
            const userInfo = responseData.data.data;
            dispatch(authActions.getUserProfileSuccess(userInfo));
            setPermission(roles.includes(userInfo.roleId));
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        } catch (error) {
          EnvConstants.IS_DEV && console.log(error);
          setAuthorized(false);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setAuthorized(false);
      setLoading(false);
    }
  }, [accessToken, dispatch, roles]);

  if (loading) {
    return <AppCommonLoading />;
  }

  if (!accessToken || !authorized) {
    Cookies.remove(ApiConstants.ACCESS_TOKEN);
    Cookies.remove(ApiConstants.REFRESH_TOKEN);
    Cookies.remove(ApiConstants.USER_INFO);
    return <Navigate to={PathConstants.LOGIN} />;
  }

  if (!permission) {
    return navigate(-1);
  }

  return <Outlet />;
};

export default Authentication;
