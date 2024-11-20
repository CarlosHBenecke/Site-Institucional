import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-34-204-246-182.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
