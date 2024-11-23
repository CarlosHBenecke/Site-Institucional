import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-98-85-126-117.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
