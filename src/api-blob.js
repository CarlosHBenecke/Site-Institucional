import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-18-215-120-62.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
