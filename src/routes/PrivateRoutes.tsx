import HomePage from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import NoFoundPage from "../pages/NoFound";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="*" element={<NoFoundPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
// index
