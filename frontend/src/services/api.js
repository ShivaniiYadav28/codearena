import axios from "axios";

const API = axios.create({
  baseURL: "https://codearena-1wri.onrender.com/api",
});

export default API;