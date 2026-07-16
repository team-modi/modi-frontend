import axiosInstance from "@utils/axiosInstance";
import axios from "axios";
import { oauthRedirectUri } from "@utils/oauth";

// 소셜 로그인 (가입 겸용). 카카오·네이버 공통 — provider 별 code 를 백엔드에서 교환한다.
// redirectUri 는 authorize 요청에 쓴 값과 정확히 일치해야 한다.
// state 는 네이버 토큰 교환에 필요(카카오는 미사용 — 백엔드에서 nullable).
export const login = async (provider, code, state) => {
  const data = await axiosInstance.post(`/auth/login/${provider}`, {
    code,
    redirectUri: oauthRedirectUri(),
    state,
  });
  return data;
};

// 게스트 로그인 (소셜 인증 없이 임시 사용자 즉시 생성)
export const guestLogin = async () => {
  const data = await axiosInstance.post("/auth/guest");
  return data;
};

// 휴대폰 식별 게스트 로그인 (같은 번호로 재로그인 시 같은 계정)
export const guestPhoneLogin = async (phoneNumber) => {
  const data = await axiosInstance.post("/auth/guest/phone", { phoneNumber });
  return data;
};

// 로그아웃
export const logout = async () => {
  const data = await axiosInstance.post("/auth/logout");
  return data;
};

// 토큰 재발급
export const refresh = () => {
  return axios.post("/api/v1/auth/refresh", {}, { withCredentials: true });
};
