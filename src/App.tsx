import useAuth from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";
import SideBar from "./components/layout/SideBar";

function App() {
  const { authenticated } = useAuth();

  return (
    <div>
      {authenticated && <SideBar />}
      <main className={authenticated ? "ml-72" : ""}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
