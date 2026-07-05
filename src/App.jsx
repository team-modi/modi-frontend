import { RouterProvider } from "react-router-dom";

// router
import { router } from "@router/LoginRoute";

// styles
import "@styles/index.css";
import "@styles/base.css";

export default function App() {
  return <RouterProvider router={router} />;
}
