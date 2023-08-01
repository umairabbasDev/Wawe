import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NoFoundPage from "../pages/NoFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/login" />} />
      <Route index path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NoFoundPage />} />
    </Routes>
  );
};

export default PublicRoutes;
// index
