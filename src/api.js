import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-3-220-57-220.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
