import axios from 'axios';
import API_URLS from "./apiUrls";

const apiService = axios.create({
    baseURL: API_URLS.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
apiService.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);


 */
export default apiService;