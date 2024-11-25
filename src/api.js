import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-54-84-26-145.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
