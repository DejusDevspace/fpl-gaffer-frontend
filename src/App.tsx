import { useState } from "react";
import useAuth from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";
import SideBar from "./components/layout/SideBar";

function App() {
  const { authenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      {authenticated && (
        <SideBar
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
      )}
      <main className={authenticated ? "ml-72" : ""}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
