import axios from "axios";
import config from "../../src/config/index.js";
export const storeInstance = axios.create({
  baseURL: config.SERVER_URL + "/store",
});
export const singletoreInstance = axios.create({
  baseURL: config.STORE_URL,
});
export const searchInstance = axios.create({
  baseURL: config.STORE_URL + "/search",
});
export const authInstance = axios.create({
  baseURL: config.SERVER_URL + "/accounts",
});
export const usingInstance = axios.create({
  baseURL: config.SERVER_URL + "/common",
});
export const reverseGeocodingInstance = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
});
