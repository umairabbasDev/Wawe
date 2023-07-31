import HomePage from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import NoFoundPage from "../pages/NoFound";
import NavBar from "../components/UI/NavBar";

const PrivateRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
// index
