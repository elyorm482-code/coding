import React, { useState } from 'react';
import { X, Github, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; avatar: string; elo: number }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [username, setUsername] = useState('alex_dev');
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: username || 'alex_dev',
      avatar: 'AL',
      elo: 2480,
    });
    onClose();
  };

  const handleDemoSignIn = (role: string) => {
    if (role === 'sarah') {
      onLoginSuccess({
        name: 'sarah_codes',
        avatar: 'SA',
        elo: 2510,
      });
    } else {
      onLoginSuccess({
        name: 'alex_dev',
        avatar: 'AL',
        elo: 2480,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl glass-panel border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white font-display">
            {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {tab === 'signin' ? 'Log in to access ranked coding arenas' : 'Join 10,000+ competitive developers today'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              tab === 'signin'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              tab === 'signup'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Get Started
          </button>
        </div>

        {/* Social / OAuth Quick sign in */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleDemoSignIn('alex')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn('sarah')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
          >
            <span className="font-bold text-sm text-cyan-400">G</span>
            <span>Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-white/10 w-full" />
          <span className="absolute bg-[#0b101c] px-3 text-[11px] font-mono text-slate-500 uppercase">
            or continue with
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Developer Handle / Email</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Secret Key / Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
          >
            <span>{tab === 'signin' ? 'Sign In to Arena' : 'Claim Free Handle'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Demo Quick Account Prompt */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Quick Demo Contender:</span>
          <button
            type="button"
            onClick={() => handleDemoSignIn('alex')}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            Load alex_dev (2,480 ELO)
          </button>
        </div>

      </div>
    </div>
  );
};
