import axiosInstance from "@utils/axiosInstance";

// 전시관 검색(자동완성)
export const searchVenues = async (params) => {
  const data = await axiosInstance.get("/venues", { params });
  return data;
};
