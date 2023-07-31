import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/Auth.tsx";
import "@fontsource/public-sans";
import { StyledEngineProvider } from "@mui/joy";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </StyledEngineProvider>
  </React.StrictMode>
);
