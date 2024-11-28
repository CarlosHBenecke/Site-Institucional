import axios from "axios";

const apiBlob = axios.create({
    baseURL: "https://qualaboa.servebeer.com/api/ms-blob/blob"
})

export default apiBlob;
