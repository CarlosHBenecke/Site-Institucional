import axios from "axios";

const apiBlob = axios.create({
    baseURL: "http://minhaapi-blob.com"
})

export default apiBlob;
