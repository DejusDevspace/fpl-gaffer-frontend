import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-4">
          FPL <span className="text-accent">Gaffer</span>
        </h1>
        <p className="text-lg text-primary/60 mb-8">
          Agentic Fantasy Premier League co-manager with full observability
        </p>
        <div className="space-y-3">
          <Link
            to="/chat"
            className="block w-full bg-accent hover:bg-accent/70 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Start Chat
          </Link>
          <Link
            to="/admin/login"
            className="block w-full bg-aux hover:bg-aux/60 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
