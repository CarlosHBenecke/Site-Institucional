import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-107-23-82-242.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
