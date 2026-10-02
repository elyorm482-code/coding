import React, { useState } from 'react';
import { Zap, Users, Code2, Trophy, BarChart3, Globe, Sparkles, ChevronRight } from 'lucide-react';
import { FEATURES } from '../data/mockData';

export const FeaturesSection: React.FC<{ onExploreFeature?: (id: string) => void }> = ({ onExploreFeature }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-purple-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-blue-400" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-indigo-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 mb-6 font-display">
            Everything you need to become better at coding
          </h2>

          <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
            Engineered for developers who crave competitive mastery. Fast-paced duels, instant automated test evaluations, and deep algorithmic diagnostics.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.id}
              onMouseEnter={() => setActiveCard(feature.id)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => onExploreFeature && onExploreFeature(feature.id)}
              className="group relative rounded-2xl glass-panel p-7 border border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-950/40 cursor-pointer flex flex-col justify-between"
            >
              {/* Top ambient hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Top row: Icon & Number index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all">
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {feature.number}
                  </span>
                </div>

                {/* Tag & Title */}
                <div className="mb-3">
                  <div className="text-[11px] font-mono text-cyan-400/90 mb-1.5 flex items-center gap-1.5">
                    <span>{feature.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Bottom footer with micro-detail & explore affordance */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200 transition-colors font-mono">
                <span className="truncate max-w-[200px] text-[11px] text-slate-400">{feature.detail}</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-1 transition-transform shrink-0" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
