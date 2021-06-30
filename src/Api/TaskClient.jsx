import axios from "axios";
import queryString from "query-string";

const getLocalToken = () => {
    const token = "Bearer " + localStorage.getItem("access_token");
    console.log("token >>>", token);
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
    getAll(id) {
        const url = `/task/${id}`;
        return axiosClient.get(url, {
            headers: {
                authorization: getLocalToken(), // headers token
            },
        });
    },
    create(data, id) {
        const url = `/task/${id}`;
        return axiosClient.post(url, data);
    },
    updateStatus(data, id) {
        const url = `/task/status/${id}`;
        return axiosClient.put(url, data, {});
    },
    delete(id) {
        const url = `/task/${id}`;
        return axiosClient.delete(url);
    },
    addUserToTask(idTask, idUser) {
        const url = `/task/${idTask}/user/${idUser}`;
        return axiosClient.post(url);
    },
};
export default taskApi;
