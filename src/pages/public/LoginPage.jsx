import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { exchangeCode } from "@api/auth";

const KAKAO_AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize" +
  `?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}` +
  "&response_type=code";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("idle");
  const exchangedRef = useRef(false);
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code || exchangedRef.current) return;
    exchangedRef.current = true;
    setStatus("loading");

    (async () => {
      try {
        await exchangeCode("kakao", code);
        setStatus("done");
      } catch (err) {
        console.error("카카오 로그인 실패:", err);
        setStatus("error");
      }
    })();
  }, [code]);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  if (status === "loading")
    return (
      <main className="login-page">
        <p>로그인 처리 중…</p>
      </main>
    );
  if (status === "done")
    return (
      <main className="login-page">
        <p>로그인 완료 ✅</p>
      </main>
    );

  return (
    <main className="login-page">
      <h1>여운</h1>
      {status === "error" && <p role="alert">로그인에 실패했어요. 다시 시도해 주세요.</p>}
      <button type="button" className="btn-kakao" onClick={handleKakaoLogin}>
        카카오로 로그인
      </button>
    </main>
  );
}
