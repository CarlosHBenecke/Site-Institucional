import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://ec2-35-175-9-58.compute-1.amazonaws.com/api/ms-blob/blob"
})

export default apiBlob;
