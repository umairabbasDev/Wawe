import HomePage from "../pages/Home";
import BooksPage from "../pages/List";
import TopicsPage from "../pages/Topics";
import AboutPage from "../pages/About";
import NoFoundPage from "../pages/NoFound";

import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/topics" element={<TopicsPage />} />
        </Route>
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
