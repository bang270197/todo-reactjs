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
};
export default projectApi;
