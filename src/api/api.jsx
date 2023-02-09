import axios from "axios";

const baseAPI = (url, options) => {
  return axios.create({
    baseURL: `https://pre-onboarding-selection-task.shop/`,
    ...options,
  });
};

const authAPI = (url, options) => {
  const instance = axios.create({
    baseURL: `https://pre-onboarding-selection-task.shop/`,
    ...options,
  });
  interceptors(instance);
  return instance;
};

const interceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("token");
    config.headers = {
      Authorization: token ? `Bearer ${token}` : null,
    };
    return config;
  });
};

export const baseInstance = baseAPI();
export const authInstance = authAPI();
