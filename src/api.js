import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-52-72-234-213.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
