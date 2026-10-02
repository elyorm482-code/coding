import React from 'react';
import { Users, Swords, Code2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { STATS_ITEMS } from '../data/mockData';

export const StatsSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'devs':
        return <Users className="w-5 h-5 text-cyan-400" />;
      case 'battles':
        return <Swords className="w-5 h-5 text-purple-400" />;
      case 'problems':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'uptime':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      default:
        return <Users className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getAccentBorder = (accent: string) => {
    switch (accent) {
      case 'cyan':
        return 'hover:border-cyan-500/50 hover:shadow-cyan-500/10';
      case 'purple':
        return 'hover:border-purple-500/50 hover:shadow-purple-500/10';
      case 'emerald':
        return 'hover:border-emerald-500/50 hover:shadow-emerald-500/10';
      case 'blue':
        return 'hover:border-blue-500/50 hover:shadow-blue-500/10';
      default:
        return 'hover:border-cyan-500/50 hover:shadow-cyan-500/10';
    }
  };

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Premium Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS_ITEMS.map((stat) => (
            <div
              key={stat.id}
              className={`group relative rounded-2xl glass-panel p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${getAccentBorder(
                stat.accent
              )} overflow-hidden`}
            >
              {/* Subtle accent corner glow */}
              <div
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"
                style={{
                  backgroundColor:
                    stat.accent === 'cyan'
                      ? '#06b6d4'
                      : stat.accent === 'purple'
                      ? '#a855f7'
                      : stat.accent === 'emerald'
                      ? '#10b981'
                      : '#3b82f6',
                }}
              />

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Header row: Icon & quick spark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(stat.id)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">
                    Verified
                  </span>
                </div>

                {/* Big Metric Value */}
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 font-display tabular-nums">
                    {stat.value}
                  </span>
                </div>

                {/* Label and detailed description */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
