import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
