import Cookies from "js-cookie";
import { ApiConstants } from "src/const";

const request = async (method, url, options) => {
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const accessToken = Cookies.get(ApiConstants.ACCESS_TOKEN);

  const baseUrl = "http://localhost:8080";

  if (options?.params) {
    const urlParams = new URLSearchParams(options?.params);
    url = `${url}?${urlParams}`;
  }

  let body = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const mainUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const response = await fetch(mainUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
      authorization: Cookies && accessToken && `Bearer ${accessToken}`,
    },
    body,
    method,
  });

  const payload = await response.json();

  const data = {
    status: response.status,
    payload,
  };

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};

const apiRequest = {
  get(url, options) {
    return request("GET", url, options);
  },
  post(url, options) {
    return request("POST", url, options);
  },
  put(url, options) {
    return request("PUT", url, options);
  },
  delete(url, options) {
    return request("DELETE", url, options);
  },
};

export default apiRequest;
