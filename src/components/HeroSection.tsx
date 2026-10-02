import React, { useState } from 'react';
import { Play, Swords, Terminal, CheckCircle2, Trophy, Users, Zap, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { HERO_CODE_SNIPPETS, HERO_TEST_RESULTS } from '../data/mockData';
import { ProgrammingLanguage } from '../types';

interface HeroSectionProps {
  selectedLanguage: ProgrammingLanguage;
  onStartCoding: () => void;
  onJoinBattle: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedLanguage,
  onStartCoding,
  onJoinBattle,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'tests'>('editor');
  const [runSuccess, setRunSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeSnippet = HERO_CODE_SNIPPETS[selectedLanguage] || HERO_CODE_SNIPPETS.javascript;
  const fileExtension = selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'typescript' ? 'ts' : selectedLanguage === 'python' ? 'py' : selectedLanguage === 'rust' ? 'rs' : selectedLanguage === 'cpp' ? 'cpp' : 'go';

  const handleRunTests = () => {
    setIsRunning(true);
    setRunSuccess(false);
    setTimeout(() => {
      setIsRunning(false);
      setRunSuccess(true);
      setActiveTab('tests');
    }, 450);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
            
            {/* Live match notification pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Season 4 Live Arena · Global Matchmaking Online</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white dark:text-white light:text-slate-900 mb-6 font-display">
              Code.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Compete.
              </span>{' '}
              Conquer.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-xl mb-9 leading-relaxed">
              Challenge developers from around the world, solve coding problems in real time, and climb the leaderboard.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onStartCoding}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white transition-transform group-hover:translate-x-0.5" />
                <span>Start Coding</span>
              </button>

              <button
                type="button"
                onClick={onJoinBattle}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-300 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Swords className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>Join a Battle</span>
              </button>
            </div>

            {/* Verified Meta Specs */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant 1v1 Pairing</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sub-20ms WebSocket Latency</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Ranked ELO System</span>
              </div>
            </div>

          </div>

          {/* Right Column: Futuristic Animated Code Editor Card & Floating UI Elements */}
          <div className="lg:col-span-6 xl:col-span-5 relative mt-6 lg:mt-0">
            
            {/* FLOATING UI ELEMENT 1: Live Battle Status (Top Left) */}
            <div className="absolute -top-6 -left-4 sm:-left-6 z-20 glass-panel px-3.5 py-2 rounded-xl border border-rose-500/30 shadow-xl shadow-rose-950/30 flex items-center gap-2 animate-bounce [animation-duration:4s]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">Live Battle</span>
                <span className="text-[10px] text-slate-400 font-mono">Room #CB-4891</span>
              </div>
            </div>

            {/* FLOATING UI ELEMENT 2: 2 Players Online (Top Right) */}
            <div className="absolute -top-7 -right-2 sm:-right-4 z-20 glass-panel px-3.5 py-2 rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-950/30 flex items-center gap-2.5">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-cyan-500/50 bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                  AL
                </div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-purple-500/50 bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                  SA
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-slate-200">2 Players Online</span>
                <span className="text-[10px] text-cyan-400 font-mono">1v1 Duel</span>
              </div>
            </div>

            {/* FLOATING UI ELEMENT 3: 98% Accuracy (Bottom Left) */}
            <div className="absolute -bottom-6 -left-3 sm:-left-6 z-20 glass-panel px-3.5 py-2.5 rounded-xl border border-emerald-500/30 shadow-xl shadow-emerald-950/30 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-400 font-mono">98% Accuracy</div>
                <div className="text-[10px] text-slate-400">Test pass rate</div>
              </div>
            </div>

            {/* FLOATING UI ELEMENT 4: Winner +250 XP (Bottom Right) */}
            <div className="absolute -bottom-7 -right-2 sm:-right-4 z-20 glass-panel px-4 py-2.5 rounded-xl border border-amber-500/30 shadow-xl shadow-amber-950/30 flex items-center gap-2.5 animate-pulse [animation-duration:3s]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 font-mono">Winner +250 XP</div>
                <div className="text-[10px] text-slate-400">Rank tier increase</div>
              </div>
            </div>

            {/* Central Futuristic Code Editor Card */}
            <div className="relative rounded-2xl glass-panel border border-cyan-500/25 shadow-2xl shadow-cyan-950/50 overflow-hidden transition-all duration-300 hover:border-cyan-500/40">
              
              {/* Window Header / Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1d]/90 border-b border-white/10">
                
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
                </div>

                {/* Tab switchers */}
                <div className="flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                      activeTab === 'editor'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    solution.{fileExtension}
                  </button>
                  <button
                    onClick={() => setActiveTab('tests')}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
                      activeTab === 'tests'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>tests.suite</span>
                    {runSuccess && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </button>
                </div>

                {/* Copy & Action */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded hover:bg-white/5 transition-colors"
                    title="Copy snippet"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto min-h-[220px] bg-[#070b14]/90 text-slate-200">
                {activeTab === 'editor' ? (
                  <div className="flex gap-4">
                    {/* Line numbers */}
                    <div className="select-none text-slate-600 text-right font-mono text-xs flex flex-col space-y-1 pt-0.5">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                      <span>6</span>
                    </div>

                    {/* Syntax Highlighted Code Display */}
                    <pre className="text-xs sm:text-sm font-mono overflow-x-auto text-slate-100 flex-1">
                      {selectedLanguage === 'javascript' ? (
                        <code>
                          <span className="text-purple-400 font-semibold">function</span>{' '}
                          <span className="text-cyan-300 font-semibold">solve</span>
                          <span className="text-slate-400">(</span>
                          <span className="text-amber-300">numbers</span>
                          <span className="text-slate-400">) &#123;</span>
                          {'\n'}
                          {'    '}<span className="text-purple-400">return</span> numbers
                          {'\n'}
                          {'        '}.<span className="text-blue-400">filter</span>
                          <span className="text-slate-400">(</span>
                          <span className="text-amber-200">n</span> =&gt; n %{' '}
                          <span className="text-emerald-400">2</span> ==={' '}
                          <span className="text-emerald-400">0</span>
                          <span className="text-slate-400">)</span>
                          {'\n'}
                          {'        '}.<span className="text-blue-400">map</span>
                          <span className="text-slate-400">(</span>
                          <span className="text-amber-200">n</span> =&gt; n *{' '}
                          <span className="text-emerald-400">2</span>
                          <span className="text-slate-400">);</span>
                          {'\n'}
                          <span className="text-slate-400">&#125;</span>
                        </code>
                      ) : (
                        <code>{activeSnippet}</code>
                      )}
                    </pre>
                  </div>
                ) : (
                  /* Test results tab */
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400 font-mono">
                      <span>Execution Sandbox: node-v22-isolate</span>
                      <span className="text-emerald-400 font-semibold">3 / 3 PASSED</span>
                    </div>
                    {HERO_TEST_RESULTS.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-semibold text-slate-200">{test.name}</span>
                          <span className="text-slate-500 text-[11px]">{test.input}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 text-[11px]">{test.output}</span>
                          <span className="text-slate-500 text-[10px] tabular-nums">{test.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Editor Footer: Interactive Run Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1d] border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Memory: 14.2 MB</span>
                  <span className="text-slate-600">·</span>
                  <span>Exit: 0</span>
                </div>

                <button
                  type="button"
                  onClick={handleRunTests}
                  disabled={isRunning}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-medium font-mono text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
