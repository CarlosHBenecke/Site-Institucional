import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-54-204-159-169.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
