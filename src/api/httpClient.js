import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://reqres.in/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default httpClient;
