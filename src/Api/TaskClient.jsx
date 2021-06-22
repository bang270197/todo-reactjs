import axiosClient from "./AxiosClient";
const taskApi = {
    getAll(id) {
        const url = `/task/${id}`;
        return axiosClient.get(url);
    },
    create(data, id) {
        const url = `/task/${id}`;
        return axiosClient.post(url, data);
    },
    updateStatus(data, id) {
        const url = `/task/status/${id}`;
        return axiosClient.put(url, data);
    },
    delete(id) {
        const url = `/task/${id}`;
        return axiosClient.delete(url);
    },
};
export default taskApi;
