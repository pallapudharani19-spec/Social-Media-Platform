import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-platform-1-8ssl.onrender.com/api",
});

export default API;