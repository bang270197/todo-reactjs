import axios from "axios";
import queryString from "query-string";

const getLocalToken = () => {
    const token = "Bearer " + localStorage.getItem("access_token");
    axiosClient.setToken(token);
    return token;
};
const axiosClient = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        "content-type": "application/json; charset=utf-8",
        // authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    timeout: 300000,
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.setToken = (token) => {
    axiosClient.defaults.headers["x-access-token"] = token;
    // window.localStorage.setItem('token', token)
};
const taskApi = {
    getAll() {
        const url = `/user`;
        return axiosClient.get(url, {
            headers: {
                authorization: getLocalToken(), // headers token
            },
        });
    },
    updateUser(data) {
        const url = `/auth/update/user`;
        return axiosClient.put(url, data, {
            headers: {
                authorization: getLocalToken(), // headers token
            },
        });
    },
};
export default taskApi;
