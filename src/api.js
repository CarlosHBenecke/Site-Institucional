import axios from "axios";

const api = axios.create({
    baseURL: "https://ec2-98-82-209-129.compute-1.amazonaws.com/api/ms-auth"
})

export default api;
