import React, { useState, useEffect } from 'react';
import { X, Swords, Users, Zap, Shield, Search, CheckCircle2, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import { ProgrammingLanguage } from '../types';

interface MatchmakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomCode?: string;
  selectedLanguage: ProgrammingLanguage;
  onSelectLanguage: (lang: ProgrammingLanguage) => void;
  onMatchFound?: (opponentName: string) => void;
}

export const MatchmakingModal: React.FC<MatchmakingModalProps> = ({
  isOpen,
  onClose,
  initialRoomCode = '',
  selectedLanguage,
  onSelectLanguage,
  onMatchFound,
}) => {
  const [mode, setMode] = useState<'quick' | 'room' | 'custom'>('quick');
  const [roomCode, setRoomCode] = useState(initialRoomCode);
  const [isSearching, setIsSearching] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [matchedOpponent, setMatchedOpponent] = useState<any>(null);

  useEffect(() => {
    if (initialRoomCode) {
      setRoomCode(initialRoomCode);
      setMode('room');
    }
  }, [initialRoomCode]);

  useEffect(() => {
    if (!isOpen) {
      setIsSearching(false);
      setMatchFound(false);
      setMatchedOpponent(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartSearch = () => {
    setIsSearching(true);
    setMatchFound(false);

    // Simulate matchmaking search
    setTimeout(() => {
      setIsSearching(false);
      setMatchFound(true);
      const opponent = {
        name: 'valkyrie_dev',
        rating: 2540,
        winRate: '82%',
        avatar: 'VD',
        country: 'SE',
      };
      setMatchedOpponent(opponent);
      if (onMatchFound) {
        onMatchFound(opponent.name);
      }
    }, 2400);
  };

  const handleJoinCustomRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setMatchFound(true);
      setMatchedOpponent({
        name: 'room_host_neo',
        rating: 2490,
        winRate: '79%',
        avatar: 'NE',
        country: 'US',
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">Enter Battle Arena</h3>
            <p className="text-xs text-slate-400 font-mono">1v1 Real-Time Ranked Matchmaking</p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        {!isSearching && !matchFound && (
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => setMode('quick')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'quick'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Quick 1v1 Match
            </button>
            <button
              type="button"
              onClick={() => setMode('room')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'room'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Room Code
            </button>
            <button
              type="button"
              onClick={() => setMode('custom')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'custom'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Duel
            </button>
          </div>
        )}

        {/* Searching Radar State */}
        {isSearching && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-cyan-500/40 animate-ping opacity-50" />
              <div className="absolute inset-2 rounded-full border border-cyan-500/60 animate-radar" />
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                <Search className="w-7 h-7 text-cyan-300 animate-spin [animation-duration:4s]" />
              </div>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Scanning Global Dev Mesh...</h4>
            <p className="text-xs text-slate-400 font-mono">
              Matching TrueSkill rating ±75 ELO · Language: {selectedLanguage.toUpperCase()}
            </p>
          </div>
        )}

        {/* Match Found State */}
        {matchFound && matchedOpponent && (
          <div className="py-6 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>OPPONENT FOUND!</span>
            </div>

            {/* Competitor Clash Cards */}
            <div className="w-full grid grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-white/5 border border-white/10 items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center font-bold text-white text-base shadow-md mb-2">
                  YOU
                </div>
                <span className="text-sm font-bold text-white">alex_dev</span>
                <span className="text-xs text-cyan-400 font-mono">2,480 ELO</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-base shadow-md mb-2">
                  {matchedOpponent.avatar}
                </div>
                <span className="text-sm font-bold text-white">{matchedOpponent.name}</span>
                <span className="text-xs text-purple-400 font-mono">{matchedOpponent.rating} ELO</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-mono mb-6">
              Challenge: Maximum Subarray Alternating Product · 10 Min Limit
            </p>

            <button
              onClick={() => {
                onClose();
                const elem = document.getElementById('battles-preview');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Arena Session →</span>
            </button>
          </div>
        )}

        {/* Quick Match Form */}
        {!isSearching && !matchFound && mode === 'quick' && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Programming Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => onSelectLanguage(lang.id)}
                    className={`p-2.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                      selectedLanguage === lang.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="truncate">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Standard Grandmaster Queue</span>
              </div>
              <span className="text-emerald-400">~2s wait</span>
            </div>

            <button
              type="button"
              onClick={handleStartSearch}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Find Opponent Now</span>
            </button>
          </div>
        )}

        {/* Room Code Form */}
        {!isSearching && !matchFound && mode === 'room' && (
          <form onSubmit={handleJoinCustomRoom} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Enter 6-Character Room Code
              </label>
              <input
                type="text"
                placeholder="e.g. CB-8924"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-base font-mono tracking-widest text-center uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Connect to Room →</span>
            </button>
          </form>
        )}

        {/* Custom Duel Creator */}
        {!isSearching && !matchFound && mode === 'custom' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Duel Difficulty</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <button className="py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">Easy</button>
                <button className="py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">Medium</button>
                <button className="py-2 rounded-lg bg-white/5 text-slate-400 border border-white/10 hover:text-white">Hard</button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Timer Duration</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <button className="py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">5 Min Blitz</button>
                <button className="py-2 rounded-lg bg-white/5 text-slate-400 border border-white/10 hover:text-white">10 Min Standard</button>
                <button className="py-2 rounded-lg bg-white/5 text-slate-400 border border-white/10 hover:text-white">20 Min Marathon</button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartSearch}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Room Passcode</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
