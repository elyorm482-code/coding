import React, { useState, useEffect } from 'react';
import { Swords, Clock, Trophy, Eye, CheckCircle2, AlertCircle, Play, Sparkles, RefreshCw, Flame, ChevronRight, Zap } from 'lucide-react';
import { BATTLE_PREVIEW_CHALLENGE, LEADERBOARD_PREVIEW } from '../data/mockData';
import { ProgrammingLanguage } from '../types';

interface LiveBattlePreviewProps {
  selectedLanguage: ProgrammingLanguage;
  onJoinMatch: () => void;
}

export const LiveBattlePreview: React.FC<LiveBattlePreviewProps> = ({
  selectedLanguage,
  onJoinMatch,
}) => {
  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState(258); // 04:18
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Player progress states
  const [playerTestsPassed, setPlayerTestsPassed] = useState(4);
  const [opponentTestsPassed, setOpponentTestsPassed] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [battleWon, setBattleWon] = useState(false);
  const [spectatorCount, setSpectatorCount] = useState(48);

  // Live timer tick
  useEffect(() => {
    if (!isTimerRunning || secondsRemaining <= 0 || battleWon) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining, battleWon]);

  // Occasional spectator count fluctuation
  useEffect(() => {
    const spectatorInterval = setInterval(() => {
      setSpectatorCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4500);
    return () => clearInterval(spectatorInterval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunPlayerSolution = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPlayerTestsPassed(5);
      setBattleWon(true);
    }, 600);
  };

  const handleSimulateOpponent = () => {
    if (opponentTestsPassed < 4) {
      setOpponentTestsPassed((prev) => prev + 1);
    }
  };

  const handleResetMatch = () => {
    setSecondsRemaining(258);
    setPlayerTestsPassed(4);
    setOpponentTestsPassed(3);
    setBattleWon(false);
    setIsTimerRunning(true);
  };

  const codeSnippet =
    BATTLE_PREVIEW_CHALLENGE.starterCode[selectedLanguage] ||
    BATTLE_PREVIEW_CHALLENGE.starterCode.typescript;

  return (
    <section id="battles-preview" className="relative py-24 md:py-32 overflow-hidden">
      
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Swords className="w-3.5 h-3.5" />
            <span>Interactive Battle Arena</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 mb-6 font-display">
            Live Battle Preview
          </h2>

          <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
            Experience real-time head-to-head competition. Test cases execute in isolated micro-containers with split-second telemetry.
          </p>
        </div>

        {/* Large Futuristic Dashboard Container */}
        <div className="rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 overflow-hidden">
          
          {/* Top Battle HUD Bar */}
          <div className="px-6 py-4 bg-[#0a0e1c] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Arena Info & Match Stakes */}
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                  Ranked Match #CB-9021
                </span>
                <span className="hidden sm:inline text-slate-500 mx-2">·</span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">Tier: Grandmaster</span>
              </div>
            </div>

            {/* Match Timer */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Clock className={`w-4 h-4 ${secondsRemaining < 60 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
              <span className="font-mono text-base font-bold tabular-nums text-white">
                {formatTimer(secondsRemaining)}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Rem</span>
            </div>

            {/* Spectators & Stakes */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="tabular-nums font-semibold">{spectatorCount}</span>
                <span className="text-slate-500 hidden md:inline">Spectating</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>+250 XP Stakes</span>
              </div>
            </div>
          </div>

          {/* Player Duel Header: 2 Competitors */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#070b16]">
            
            {/* Player 1: You (alex_dev) */}
            <div className={`p-5 transition-all ${battleWon ? 'bg-emerald-950/20' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/30">
                      AL
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070b16]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">alex_dev</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-semibold">
                        YOU
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      Rating: <span className="text-cyan-400 font-semibold tabular-nums">2,480 ELO</span> · 98% Acc
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-cyan-400">
                    {playerTestsPassed}/5 Tests
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {battleWon ? 'All Passed!' : 'Solving...'}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    battleWon ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  }`}
                  style={{ width: `${(playerTestsPassed / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Player 2: Opponent (sarah_codes) */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/30">
                      SA
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070b16]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">sarah_codes</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-semibold">
                        OPPONENT
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      Rating: <span className="text-purple-400 font-semibold tabular-nums">2,510 ELO</span> · 96% Acc
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-purple-400">
                    {opponentTestsPassed}/5 Tests
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 justify-end">
                    <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span>Typing (112 WPM)</span>
                  </div>
                </div>
              </div>

              {/* Opponent Progress bar */}
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${(opponentTestsPassed / 5) * 100}%` }}
                />
              </div>
            </div>

          </div>

          {/* Victory Alert Banner (if won) */}
          {battleWon && (
            <div className="px-6 py-3.5 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 border-y border-emerald-500/30 flex items-center justify-between animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-emerald-300 text-sm">VICTORY ACHIEVED!</span>
                  <span className="text-xs text-slate-300 ml-2">You solved all 5 test cases first. +250 XP & +34 ELO awarded!</span>
                </div>
              </div>
              <button
                onClick={handleResetMatch}
                className="text-xs font-mono text-cyan-300 hover:text-white underline cursor-pointer"
              >
                Reset Demo
              </button>
            </div>
          )}

          {/* Main Battle Body: Split Challenge & Code Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Left: Challenge Description & Test Suites */}
            <div className="lg:col-span-5 p-6 bg-[#080d19]/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    {BATTLE_PREVIEW_CHALLENGE.difficulty}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {BATTLE_PREVIEW_CHALLENGE.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  {BATTLE_PREVIEW_CHALLENGE.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {BATTLE_PREVIEW_CHALLENGE.description}
                </p>

                {/* Test Cases Tracker */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-mono font-semibold uppercase text-slate-400 mb-2">
                    Automated Test Suite (5 Cases)
                  </div>

                  {BATTLE_PREVIEW_CHALLENGE.testCases.map((tc, idx) => {
                    const isPassed = idx < playerTestsPassed;
                    return (
                      <div
                        key={tc.id}
                        className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                          isPassed
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-white/5 border-white/5 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                          )}
                          <span>Case {tc.id}:</span>
                          <span className="text-slate-300">{tc.input}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">Exp: {tc.expected}</span>
                          <span className="text-[10px] text-slate-500">
                            {isPassed ? `${tc.runtimeMs}ms` : 'Pending'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Simulation triggers */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleSimulateOpponent}
                  className="text-xs font-mono text-slate-400 hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  <span>Simulate Opponent Solve</span>
                </button>
                <span className="text-[11px] font-mono text-slate-500">Ping: 14ms</span>
              </div>
            </div>

            {/* Right: Live Code Editor View */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-[#060a14]">
              
              {/* Code window top tabs */}
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-200 font-semibold">solution.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'rust' ? 'rs' : selectedLanguage === 'cpp' ? 'cpp' : 'ts'}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-500">Memory limit: 256MB</span>
                </div>
                <span className="text-cyan-400 text-[11px]">Strict Mode</span>
              </div>

              {/* Code Editor Area */}
              <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-200 min-h-[300px]">
                <pre>
                  <code>{codeSnippet}</code>
                </pre>
              </div>

              {/* Bottom Interactive Submission Bar */}
              <div className="p-4 bg-[#0a0f1d] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-mono text-slate-400">
                    Status: <span className="text-emerald-400 font-semibold">{battleWon ? 'Won (+250 XP)' : 'In Progress'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRunPlayerSolution}
                    disabled={isSubmitting || battleWon}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                    <span>{isSubmitting ? 'Executing Sandbox...' : battleWon ? 'Match Concluded' : 'Run & Submit Final Test'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onJoinMatch}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Enter Ranked Queue</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
