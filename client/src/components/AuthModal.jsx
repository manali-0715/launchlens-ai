import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  KeyRound,
  Eye,
  EyeOff,
  GraduationCap
} from 'lucide-react';

export default function AuthModal({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Startup Founder');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login' 
      ? { email, password }
      : { email, password, full_name: fullName, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Authentication failed. Please verify credentials.');
      }

      // Store token in localStorage
      localStorage.setItem('launchlens_token', data.token);
      localStorage.setItem('launchlens_user', JSON.stringify(data.user));
      onAuthSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, password: demoPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Demo login failed');
      }
      localStorage.setItem('launchlens_token', data.token);
      localStorage.setItem('launchlens_user', JSON.stringify(data.user));
      onAuthSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message || 'Failed to authenticate demo account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Branding */}
        <div className="p-6 sm:p-8 pb-4 text-center border-b border-slate-800/80 relative">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25 mb-3 ring-1 ring-white/20">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            LaunchLens<span className="text-indigo-400">.AI</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Control Flow Gateway • Please authenticate to access the Dashboard
          </p>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 mt-5">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'register' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register (New Founder)
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 pt-6 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="leading-relaxed font-medium">
                <span className="font-bold">Credential Error:</span> {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@company.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Platform Role
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="Startup Founder">Startup Founder / Ideator</option>
                    <option value="Academic Evaluator / Guide">Academic Evaluator / Guide</option>
                    <option value="Student Innovator">Student Innovator</option>
                    <option value="Venture Capital Analyst">Venture Capital Analyst</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{mode === 'login' ? 'Validate Credentials & Enter Dashboard' : 'Create Account & Enter'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* 1-Click Demo Evaluation Accounts */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1.5">
              <KeyRound className="w-3 h-3 text-amber-400" />
              1-Click Demo Credentials (For Evaluation & Grading):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('founder@launchlens.ai', 'password123')}
                className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-white group-hover:text-indigo-300">
                  ⚡ Founder Demo
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  founder@launchlens.ai
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('evaluator@atharva.edu', 'password123')}
                className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-white group-hover:text-cyan-300 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-cyan-400" />
                  Evaluator Demo
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  evaluator@atharva.edu
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
