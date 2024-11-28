import axios from "axios";

const api = axios.create({
    baseURL: "https://qualaboa.servebeer.com/api/ms-auth"
})

export default api;
