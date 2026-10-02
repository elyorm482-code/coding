import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';
import { Swords, Code, Trophy, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const HowItWorksSection: React.FC<{ onJoinRoomClick?: () => void }> = ({ onJoinRoomClick }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Swords className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Code className="w-5 h-5 text-blue-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const currentStep = HOW_IT_WORKS_STEPS[activeStepIndex];

  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-4">
            <span>Streamlined Flow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 mb-6 font-display">
            How It Works
          </h2>

          <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
            Jump from spectator to high-ranked contender in three simple steps.
          </p>
        </div>

        {/* 3 Step Cards in interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Step Selector Cards (Left Column) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'glass-panel border-cyan-500/50 shadow-xl shadow-cyan-950/40 translate-x-1'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-base transition-colors shrink-0 ${
                        isActive
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                          : 'bg-white/5 border border-white/10 text-slate-500'
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {step.step} — {step.title}
                        </h3>
                        {isActive && (
                          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                            Active Stage
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Visual Preview Inspector (Right Column) */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden">
              {/* Background ambient radial */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {getStepIcon(activeStepIndex)}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{currentStep.badge}</div>
                      <div className="text-sm font-semibold text-white">{currentStep.headline}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Synchronized</span>
                  </div>
                </div>

                {/* Simulated Code / Terminal Payload */}
                <div className="rounded-xl bg-[#060a12] border border-white/10 p-4 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto shadow-inner">
                  <pre className="text-cyan-300 font-mono">
                    <code>{currentStep.codeSnippet}</code>
                  </pre>
                </div>

                {/* Additional Interactive Context */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {activeStepIndex === 0 && 'Instant matchmaking or custom room passkeys'}
                      {activeStepIndex === 1 && 'Automated sandbox execution with 5 edge-case test suites'}
                      {activeStepIndex === 2 && 'Gain XP, rank progression, and public match replay link'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Anti-cheat detection and strict deterministic runtime limits</span>
                  </div>
                </div>
              </div>

              {/* Action trigger button */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Step {activeStepIndex + 1} of 3</span>
                <button
                  type="button"
                  onClick={() => {
                    if (activeStepIndex < 2) {
                      setActiveStepIndex(activeStepIndex + 1);
                    } else if (onJoinRoomClick) {
                      onJoinRoomClick();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>{activeStepIndex < 2 ? 'Next Stage' : 'Launch Battle'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
