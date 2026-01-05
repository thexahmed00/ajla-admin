export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black text-white">

      
      {/* LEFT SIDE – LOGIN FORM */}
      <div className="w-full max-w-[500px] flex items-center justify-center px-8 ml-14">
        <div className="w-full bg-[#1C1C1C] rounded-2xl p-8 border border-[#2A2A2A] shadow-xl">
          
          {/* Logo */}
          <h1 className="text-3xl text-center tracking-widest mb-1">
            AJLA
          </h1>
          <p className="text-center text-[#FF7F41] text-sm mb-8">
            ADMIN DASHBOARD
          </p>

          {/* Email */}
          <label className="text-sm text-gray-400">Email</label>
          <div className="mt-2 mb-4 relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-[#FF7F41] outline-none text-white placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <label className="text-sm text-gray-400">Password</label>
          <div className="mt-2 mb-6 relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-[#2A2A2A] outline-none text-white placeholder-gray-500"
            />
          </div>

          {/* Button */}
          <button className="w-full py-3 rounded-lg bg-[#FF7F41] text-black font-semibold hover:opacity-90 transition">
            Sign In
          </button>

          {/* Footer text */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Premium Concierge Management System
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – GRADIENT */}
      <div className="hidden md:block flex-1 bg-gradient-to-br from-black to-[#4A2E22]" />
    </div>
  );
}
