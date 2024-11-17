import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-18-205-89-172.compute-1.amazonaws.com/api/ms-blob"
})

export default apiBlob;
