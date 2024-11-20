import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-50-19-124-224.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
