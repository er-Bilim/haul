import axios from 'axios';
import { API_URL } from '@/constants/constants';
import { useUserStore } from '@/features/users/userStore';

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.withCredentials = true;

const logoutAndRedirect = async () => {
  try {
    await axios.delete(`${API_URL}/users/sessions`, {
      withCredentials: true,
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);
  }

  try {
    useUserStore.getState().logoutUser();
  } catch (error) {
    console.error(error);
  }

  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== '/users/token' &&
      originalRequest.url !== '/users/sessions'
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${API_URL}/users/token`,
          {},
          { withCredentials: true },
        );

        return axiosApi(originalRequest);
      } catch (refreshToken) {
        await logoutAndRedirect();
        return Promise.reject(refreshToken);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApi;
