// import axiosClient from "./AxiosClient";
import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        "content-type": "application/json; charset=utf-8",
        authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
const authApi = {
    login(body) {
        const url = `/auth/login`;
        return axiosClient.post(url, body);
    },
    register(body) {
        const url = `/auth/register`;
        return axiosClient.post(url, body);
    },
};
export default authApi;
