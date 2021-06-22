import axiosClient from "./AxiosClient";
const projectApi = {
    getAll(params) {
        const url = "/project";
        return axiosClient.get(url, { params });
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
};
export default projectApi;
