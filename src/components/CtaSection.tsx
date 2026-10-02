import React, { useState } from 'react';
import { ArrowRight, Swords, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

interface CtaSectionProps {
  onStartFirstBattle: (roomCode?: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartFirstBattle }) => {
  const [quickCode, setQuickCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartFirstBattle(quickCode.trim() || undefined);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Large Premium CTA Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden border border-cyan-500/40 bg-gradient-to-br from-[#0c1224] via-[#090d1a] to-[#120e24] shadow-2xl shadow-cyan-950/50">
          
          {/* Ambient glowing radial effects */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Grid lines inside */}
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-6">
              <Swords className="w-3.5 h-3.5" />
              <span>Instant Matchmaking Awaits</span>
            </div>

            {/* Headline from brief */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 font-display">
              Ready to prove your coding skills?
            </h2>

            {/* Subtitle from brief */}
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
              Join your first coding battle today.
            </p>

            {/* Interactive Quick Join Bar */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Optional Room Code (e.g. CB-8924)"
                  value={quickCode}
                  onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono placeholder:text-slate-500 shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Start Your First Battle →</span>
              </button>
            </form>

            {/* Trust Markers */}
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Installation</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant 1v1 Pairing</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free Forever</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
