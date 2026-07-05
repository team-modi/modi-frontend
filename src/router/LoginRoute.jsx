import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import HomePage from "@pages/HomePage";
import UserPage from "@pages/UserPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/yeowun", element: <HomePage /> },
  { path: "/user", element: <UserPage /> },
]);
