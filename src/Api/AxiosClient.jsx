import axios from "axios";
import queryString from "query-string";

let _accessToken = localStorage.getItem("access_token");

// header["authorization"] = "Bearer ";
const axiosClient = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        "content-type": "application/json; charset=utf-8",
        authorization: `Bearer ${_accessToken}`,
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;
