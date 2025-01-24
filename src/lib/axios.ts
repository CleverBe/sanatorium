import axios from "axios"

const BASE_URL = "https://backend-sanatorium-business.onrender.com/api/"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.defaults.headers.common["Content-Type"] = "application/json"

export { api }
