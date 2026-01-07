"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      // Persist token
      localStorage.setItem("access_token", data.access_token);

      // Optional: store role
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: decoded.email,
          is_admin: decoded.is_admin,
        })
      );
      console.log("decoded jwt", decoded)
      // Store token
      document.cookie = `token=${data.access_token}; path=/`;

      // Role-based navigation
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* LEFT */}
      <div className="w-full max-w-[500px] flex items-center justify-center px-8 ml-14">
        <div className="w-full bg-[#1C1C1C] rounded-2xl p-8 border border-[#2A2A2A] shadow-xl">
          <h1 className="text-3xl text-center tracking-widest mb-1">
            AJLA
          </h1>
          <p className="text-center text-[#FF7F41] text-sm mb-8">
            ADMIN DASHBOARD
          </p>

          {/* Email */}
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 mb-4 px-4 py-3 rounded-lg bg-[#121212] border border-[#FF7F41] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-2 mb-6 px-4 py-3 rounded-lg bg-[#121212] border border-[#2A2A2A] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#FF7F41] text-black font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-6">
            Premium Concierge Management System
          </p>
        </div>
      </div>

      {/* RIGHT */}
      {/* <div className="hidden md:block flex-1 bg-gradient-to-br from-black to-[#4A2E22]" /> */}
    </div>
  );
}
