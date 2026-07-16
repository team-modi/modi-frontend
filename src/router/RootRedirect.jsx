import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// api
import { getUserInfo } from "@api/user";

export const REDIRECT_AFTER_LOGIN_KEY = "modi:redirectAfterLogin";

export default function RequireAuth({ children }) {
  const [status, setStatus] = useState("checking");
  const location = useLocation();

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        await getUserInfo();
        if (!ignore) setStatus("authed");
      } catch {
        if (!ignore) setStatus("guest");
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  if (status === "checking") return null;
  if (status === "guest") {
    sessionStorage.setItem(REDIRECT_AFTER_LOGIN_KEY, location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return children;
}
