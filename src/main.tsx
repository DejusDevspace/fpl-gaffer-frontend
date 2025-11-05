import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import FPLProvider from "./context/FPLContext";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <FPLProvider>
          <App />
        </FPLProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
