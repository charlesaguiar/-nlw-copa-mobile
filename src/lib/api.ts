import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.3.15:3333", // localhost funciona no ios, mas não no android
});
