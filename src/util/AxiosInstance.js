import axios from "axios";
import AuthService from "./AuthServise";
import config from "../config";

let axiosInstance = axios.create({
    baseURL: config.serverUrl,
    timeout: 60000,
});

axiosInstance.interceptors.request.use(function (config) {
    if (localStorage.getItem("Authentication") === "true") {
        config.headers.Authorization = "Bearer " + localStorage.getItem("JWT");
    }
    return config;
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response !== undefined && error.response.status === 401) {
            AuthService.logout();
            if (window.location.pathname !== "/login")
                window.location = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;