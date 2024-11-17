import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-54-234-187-50.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
