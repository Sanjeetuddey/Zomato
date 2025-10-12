import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4505" ,withCredentials:true});

export default api;


