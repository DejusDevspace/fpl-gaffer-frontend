import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, AdminLogin, Chat } from "../pages";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
