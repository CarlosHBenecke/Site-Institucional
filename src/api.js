import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-50-19-124-224.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
