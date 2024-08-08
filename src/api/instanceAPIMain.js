import axios from "axios";
import Cookies from "js-cookie";
import { ApiConstants } from "src/const";
import { ErrorCodes, ErrorMessages } from "./errorCodes";

const instanceAPIMain = axios.create({
  //baseURL: process.env.MAIN_API_URL,
  baseURL: "http://localhost:8080",
  timeout: ApiConstants.TIMEOUT,
  responseType: "json",
  headers: ApiConstants.HEADER_DEFAULT,
});

instanceAPIMain.interceptors.request.use(
  (requestConfig) => {
    try {
      const accessToken = Cookies.get(ApiConstants.ACCESS_TOKEN);
      if (Cookies && accessToken) {
        requestConfig.headers["authorization"] = "Bearer " + accessToken;
      }
      return requestConfig;
    } catch (error) {
      let errorCode = ErrorCodes.UNKNOWN_ERROR;

      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorCode = ErrorCodes.UNAUTHORIZED;
            break;
          case 403:
            errorCode = ErrorCodes.FORBIDDEN;
            break;
          case 404:
            errorCode = ErrorCodes.NOT_FOUND;
            break;
          case 500:
            errorCode = ErrorCodes.INTERNAL_SERVER_ERROR;
            break;
          default:
            errorCode = ErrorCodes.UNKNOWN_ERROR;
            break;
        }
      } else if (error.request) {
        errorCode = ErrorCodes.NETWORK_ERROR;
      }

      return Promise.reject({
        code: errorCode,
        message: ErrorMessages[errorCode],
      });
    }
  },
  (error) => {
    console.log(error);
    //TODO: handle error
    return Promise.reject(error);
  }
);

export default instanceAPIMain;
