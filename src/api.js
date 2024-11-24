import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-35-175-9-58.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
