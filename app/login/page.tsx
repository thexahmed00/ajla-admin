"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

type DecodedToken = {
  email: string;
  is_admin: boolean;
  exp: number;
  sub: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const decoded = jwtDecode<DecodedToken>(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: decoded.email,
          is_admin: decoded.is_admin,
        })
      );
      document.cookie = `token=${data.access_token}; path=/`;

      if (decoded.is_admin) {
        router.push("/dashboard");
      } else {
        router.push("/access-denied");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] left-[-15%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[600px] h-[600px] bg-primary/6 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/4 rounded-full blur-[80px] animate-float" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-[420px] px-6 relative z-10">
        <div className="glass rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/50 animate-fade-in-up">
          {/* Logo */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-[0.25em] mb-2 gradient-text">
              AJLA
            </h1>
            <p className="text-primary/80 text-xs font-medium tracking-[0.3em] uppercase">
              Admin Dashboard
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Email
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border text-text-main placeholder:text-text-dim outline-none focus:border-primary focus:bg-background transition-all duration-300 focus-ring"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === 'email' && (
                  <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none animate-fade-in" />
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-background/80 border border-border text-text-main placeholder:text-text-dim outline-none focus:border-primary focus:bg-background transition-all duration-300 focus-ring"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-text-dim hover:text-text-muted transition-colors rounded-lg hover:bg-surface-hover"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {focusedField === 'password' && (
                  <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none animate-fade-in" />
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 py-3 px-4 rounded-xl border border-red-400/20 animate-fade-in">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-surface font-bold 
                hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
                active:translate-y-0 active:shadow-md
                transition-all duration-200 
                disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none
                cursor-pointer relative overflow-hidden group"
            >
              <span className={`flex items-center justify-center gap-2 transition-all duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                Sign In
              </span>
              {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                </span>
              )}
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-xs text-text-dim text-center tracking-wide">
              Premium Concierge Management System
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-6 gap-1.5">
          <div className="w-8 h-1 rounded-full bg-primary/60" />
          <div className="w-2 h-1 rounded-full bg-primary/30" />
          <div className="w-2 h-1 rounded-full bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
