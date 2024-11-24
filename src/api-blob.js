import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-107-23-82-242.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
