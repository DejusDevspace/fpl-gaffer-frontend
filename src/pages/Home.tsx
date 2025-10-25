import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../api/apiClient";
import { LogOut } from "lucide-react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-background to-accent/50
    flex flex-col items-center justify-center p-4"
    >
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary mb-4">
            FPL <span className="text-accent">Gaffer ⚽</span>
          </h1>
          <p className="text-xl text-primary/45 mb-8">
            Your AI-powered Fantasy Premier League co-manager with insights,
            analytics, and personalized advice
          </p>
        </div>

        <div className="space-y-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block w-full bg-aux hover:bg-aux/70 hover:scale-105 text-white
                font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
              >
                View Dashboard
              </Link>
              <Link
                to="/chat"
                className="block w-full bg-accent hover:bg-accent/70 hover:scale-105 text-white
                font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
              >
                Chat with Gaffer
              </Link>

              {/* <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button> */}
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="block w-full bg-aux hover:bg-aux/70 hover:scale-105 text-white
                font-semibold py-4 px-8 rounded-lg transition shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="block w-full bg-accent hover:bg-accent/70 hover:scale-105 text-white
                font-semibold py-4 px-8 rounded-lg transition shadow-lg"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-accent/60">Live Stats</h3>
            <p className="text-sm text-primary/55">Track your performance</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-accent/60">AI Advice</h3>
            <p className="text-sm ttext-primary/55">Smart recommendations</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-accent/60">Analytics</h3>
            <p className="text-sm text-primary/55">Deep insights</p>
          </div>
        </div>
      </div>
    </div>
  );
}
