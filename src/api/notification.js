import axiosInstance from "@utils/axiosInstance";

// 알림 목록 조회
export const getNotificationList = async (params) => {
  const data = await axiosInstance.get("/notifications", { params });
  return data;
};

// 알림 읽음 처리
export const readNotification = async (notificationId) => {
  const data = await axiosInstance.put(`/notifications/${notificationId}/read`);
  return data;
};
