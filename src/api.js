import axios from "axios";

const api = axios.create({
    baseURL: "http://minhaapi.com"
})

export default api;
