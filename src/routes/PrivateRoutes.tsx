import HomePage from "../pages/Home";
import BooksPage from "../pages/List";
import { Route, Routes } from "react-router-dom";
import NoFoundPage from "../pages/NoFound";
import AppLayout from "../layouts/AppLayout";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
        </Route>
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
