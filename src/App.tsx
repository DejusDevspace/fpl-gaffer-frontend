import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";
import SideBar from "./components/layout/SideBar";

function App() {
  const { authenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex">
      {authenticated && (
        <SideBar
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
      )}
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
