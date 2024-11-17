import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-52-72-234-213.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
