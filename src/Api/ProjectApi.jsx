// import axiosClient from "./AxiosClient";
import axios from "axios";
import queryString from "query-string";

const getLocalToken = () => {
    const token = "Bearer " + localStorage.getItem("access_token");
    axiosClient.setToken(token);
    return token;
};

const axiosClient = axios.create({
    baseURL: "https://api.testgetbee.getbee.vn/api",
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

const projectApi = {
    getAll(params) {
        const url = "/project";
        return axiosClient.get(url, {
            params,
            headers: {
                authorization: getLocalToken(), // headers token
            },
        });
    },
    create(data) {
        const url = "/project";
        return axiosClient.post(url, data);
    },
    delete(id) {
        const url = `/project/${id}`;
        return axiosClient.delete(url);
    },
    update(data, id) {
        const url = `/project/${id}`;
        return axiosClient.put(url, data);
    },
    updateStaus(id) {
        const url = `/project/status/${id}`;
        return axiosClient.put(url);
    },
    addUserToProject(idProject, iduser) {
        const url = `/project/${idProject}/user/${iduser}`;
        return axiosClient.post(url, {
            headers: {
                authorization: getLocalToken(), // headers token
            },
        });
    },
    getUserByProject(id) {
        const url = `/project/user/${id}`;
        return axiosClient.get(url, {
            headers: {
                authorization: getLocalToken(), // headers token
            },
        });
    },
    countTaskAndUser(id) {
        const url = `/project/count/${id}`;
        return axiosClient.get(url);
    },
};
export default projectApi;
