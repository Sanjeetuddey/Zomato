import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4505/api" ,withCredentials:true});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // 👈 check this
//   withCredentials: true,
// });

// export default api;
