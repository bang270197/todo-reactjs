import axiosClient from "./AxiosClient";
const taskApi = {
    getAll() {
        const url = `/user`;
        return axiosClient.get(url);
    },
};
export default taskApi;
