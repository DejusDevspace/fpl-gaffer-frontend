import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function SignUp() {
  const { signup, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const ok = await signup(email, password);
    if (ok) setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-greenAccent text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-accent/80 mb-4">
            Account Created!
          </h2>
          <p className="text-primary/70">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Sign Up for FPL Gaffer
        </h1>

        {error && (
          <div className="bg-error/20 border border-error text-error px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-background bg-secondary/20 text-primary/70 rounded-lg px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-background text-primary/70 rounded-lg px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:bg-neutral text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition-all duration-300"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-primary/70">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
