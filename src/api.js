import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-18-205-89-172.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
