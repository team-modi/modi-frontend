import { useEffect } from "react";
import LoginPage from "@pages/public/LoginPage";

function App() {
  useEffect(() => {
    fetch("/api/actuator/health")
      .then((res) => res.json())
      .catch(() => {});
  }, []);

  return (
    <>
      <div>여운</div>
      <LoginPage />
    </>
  );
}

export default App;
