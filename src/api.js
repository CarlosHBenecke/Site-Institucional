import axios from "axios";

const api = axios.create({
    baseURL: "http://minhaapi-auth.com"
})

export default api;
