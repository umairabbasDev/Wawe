import React from "react";
import AppRoutes from './routes'

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
      <AppRoutes/>
      <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
