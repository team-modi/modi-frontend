import axiosInstance from "@utils/axiosInstance";

export const exchangeCode = async (provider, code) => {
  const { data } = await axiosInstance.post(`/auth/login/${provider}`, {
    code,
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
  });
  return data;
};

export const refresh = async () => {
  const { data } = await axiosInstance.post("/auth/refresh");
  return data;
};
