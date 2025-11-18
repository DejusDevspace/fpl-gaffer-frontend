import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  if (authenticated) {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-accent/50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center p-4 py-20">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              FPL <span className="text-accent">Gaffer ⚽</span>
            </h1>
            <p className="text-lg text-primary/60 mb-8">
              AI-powered Fantasy Premier League insights and advice
            </p>
          </div>

          <div className="space-y-4">
            <div>
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
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center pb-8">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-primary/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Why Choose FPL Gaffer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-surface/50 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                AI-Powered Advice
              </h3>
              <p className="text-primary/75">
                Get intelligent recommendations backed by real data, no
                hallucinations
              </p>
            </div>
            <div className="p-6 bg-surface/50 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                Live Stats & Analytics
              </h3>
              <p className="text-primary/75">
                Track your performance with detailed charts and real-time data
              </p>
            </div>
            <div className="p-6 bg-surface/50 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                Conversational Chat
              </h3>
              <p className="text-primary/75">
                Chat naturally with your AI co-manager about transfers and
                strategy
              </p>
            </div>
            <div className="p-6 bg-surface/50 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                Player Research
              </h3>
              <p className="text-primary/75">
                Deep dive into player stats, form, injuries, and pricing
              </p>
            </div>
            <div className="p-6 bg-surface/50 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                Fixture Analysis
              </h3>
              <p className="text-primary/75">
                Plan ahead with upcoming fixture analysis and captain
                suggestions
              </p>
            </div>
            <div className="p-6 bg-surface/50 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                Budget Planning
              </h3>
              <p className="text-primary/75">
                Smart transfer suggestions within your exact financial
                constraints
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            How FPL Gaffer Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Link Your FPL Team
                </h3>
                <p className="text-primary/75">
                  Connect your Fantasy Premier League account to sync your team
                  data and get personalized insights
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Explore Your Dashboard
                </h3>
                <p className="text-primary/75">
                  View comprehensive analytics including points history, rank
                  progression, and transfer tracking
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Chat with Gaffer
                </h3>
                <p className="text-primary/75">
                  Ask questions about transfers, player analysis, or strategy.
                  The AI validates all responses with real data
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Get Data-Driven Advice
                </h3>
                <p className="text-primary/75">
                  Receive accurate, hallucination-free recommendations based on
                  your team, budget, and fixtures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            What to Expect in Your Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface/50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-accent mb-4">
                Team Overview
              </h3>
              <ul className="space-y-2 text-primary/75">
                <li>• Current Gameweek status and captain</li>
                <li>• Gameweek and total points tracking</li>
                <li>• Transfer count and budget information</li>
                <li>• Real-time team value and rank</li>
              </ul>
            </div>
            <div className="bg-surface/50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-accent mb-4">
                Analytics & Charts
              </h3>
              <ul className="space-y-2 text-primary/75">
                <li>• Rank progression over gameweeks</li>
                <li>• Points distribution and trends</li>
                <li>• Transfer impact analysis</li>
                <li>• Performance metrics visualization</li>
              </ul>
            </div>
            <div className="bg-surface/50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-accent mb-4">
                Quick Actions
              </h3>
              <ul className="space-y-2 text-primary/75">
                <li>• Direct chat with AI Gaffer</li>
                <li>• Sync latest FPL data</li>
                <li>• Access settings and preferences</li>
                <li>• Manage account and team links</li>
              </ul>
            </div>
            <div className="bg-surface/50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-accent mb-4">
                AI-Powered Insights
              </h3>
              <ul className="space-y-2 text-primary/75">
                <li>• Personalized transfer recommendations</li>
                <li>• Fixture-based captain suggestions</li>
                <li>• Budget-aware player analysis</li>
                <li>• Real-time news and injury updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 px-4 bg-accent/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Dominate Your League?
          </h2>
          <p className="text-xl text-primary/75 mb-8">
            Join thousands of managers using FPL Gaffer to make smarter
            decisions and climb the rankings.
          </p>
          <div className="space-y-4">
            {authenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-block bg-aux hover:bg-aux/70 hover:scale-105 text-white
                  font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/chat"
                  className="inline-block bg-accent hover:bg-accent/70 hover:scale-105 text-white
                  font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg ml-4"
                >
                  Start Chatting
                </Link>
              </>
            ) : (
              <Link
                to="/signup"
                className="inline-block bg-aux hover:bg-aux/70 hover:scale-105 text-white
                font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
              >
                Get Started Today
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
