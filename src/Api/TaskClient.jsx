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
};
export default taskApi;
