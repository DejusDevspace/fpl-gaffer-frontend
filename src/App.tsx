import useAuth from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";
import SideBar from "./components/layout/SideBar";
import { SidebarProvider } from "./context/SidebarContext";
import { useSidebar } from "./hooks/useSidebar";

function AppContent() {
  const { authenticated } = useAuth();
  const { isOpen } = useSidebar();

  return (
    <div>
      {authenticated && <SideBar />}
      <main className={authenticated ? (isOpen ? "ml-72" : "ml-20") : ""}>
        <AppRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
}

export default App;
