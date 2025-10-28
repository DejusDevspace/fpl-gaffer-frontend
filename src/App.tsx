import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import SideBar from "./components/layout/SideBar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <div className="flex">
          <SideBar
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode(!darkMode)}
          />
          <main className="flex-1 p-8">
            <AppRoutes />
            <h1 className="text-2xl font-bold">Welcome to Relatus.AI Clone</h1>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
