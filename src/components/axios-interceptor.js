import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // Redirigez l'utilisateur vers la page de connexion
      window.location.href = '/mon-compte';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
