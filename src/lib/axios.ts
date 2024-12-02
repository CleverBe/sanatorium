import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

myAxios.defaults.headers.common["Content-Type"] = "application/json";
