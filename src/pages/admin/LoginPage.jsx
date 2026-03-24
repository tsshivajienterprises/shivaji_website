import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1020] px-5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-2xl"
      >
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto h-12 mb-4" />
          <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-white/50 text-balance">Sign in to manage your construction portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition-all focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/[0.02]"
              placeholder="admin@tsshivaji.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition-all focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/[0.02]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#D4AF37] py-4 text-sm font-bold text-black shadow-[0_0_24px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-100 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In →'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-white/30">
          © 2026 TS SHIVA JI ENTERPRICES PVT LTD.
        </p>
      </motion.div>
    </div>
  );
}
