import axios from "axios"

const BASE_URL = "http://localhost:4000/api/"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.defaults.headers.common["Content-Type"] = "application/json"

export default api
