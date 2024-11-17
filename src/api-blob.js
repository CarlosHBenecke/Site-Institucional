import axios from "axios";

const apiBlob = axios.create({
    baseURL: process.env.REACT_APP_API_BLOB_URL
})

export default apiBlob;
