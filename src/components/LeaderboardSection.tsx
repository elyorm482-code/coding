import React, { useState } from 'react';
import { Trophy, Medal, Award, Flame, Search, Globe, ChevronUp, Star } from 'lucide-react';
import { LEADERBOARD_PREVIEW } from '../data/mockData';

export const LeaderboardSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'global' | 'weekly' | 'grandmaster'>('global');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = LEADERBOARD_PREVIEW.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="leaderboard" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Season 4 Hall of Fame</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 font-display">
              Global Leaderboard
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              The highest ranked algorithmic gladiators worldwide.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setSelectedFilter('global')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === 'global'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setSelectedFilter('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === 'weekly'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setSelectedFilter('grandmaster')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === 'grandmaster'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Grandmasters
            </button>
          </div>
        </div>

        {/* Leaderboard Table Container */}
        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-3.5 bg-[#0a0f1e] text-slate-400 text-xs font-mono uppercase tracking-wider border-b border-white/10">
            <div className="col-span-2 sm:col-span-1">Rank</div>
            <div className="col-span-6 sm:col-span-5">Developer</div>
            <div className="col-span-4 sm:col-span-2 text-right">Rating ELO</div>
            <div className="hidden sm:block sm:col-span-2 text-right">Win Rate</div>
            <div className="hidden sm:block sm:col-span-2 text-right">Tier Badge</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5 font-mono text-sm">
            {filteredUsers.map((player) => {
              const isFirst = player.rank === 1;
              const isSecond = player.rank === 2;
              const isThird = player.rank === 3;

              return (
                <div
                  key={player.rank}
                  className={`grid grid-cols-12 items-center px-6 py-4 hover:bg-white/[0.04] transition-colors ${
                    isFirst ? 'bg-amber-500/[0.03]' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                    {isFirst && <Medal className="w-5 h-5 text-amber-400" />}
                    {isSecond && <Medal className="w-5 h-5 text-slate-300" />}
                    {isThird && <Medal className="w-5 h-5 text-amber-600" />}
                    {!isFirst && !isSecond && !isThird && (
                      <span className="text-slate-500 font-bold pl-1.5 tabular-nums">#{player.rank}</span>
                    )}
                  </div>

                  {/* Developer Name & Country */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                      {player.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{player.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.2 rounded bg-white/5">
                          {player.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating ELO */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="font-bold text-cyan-400 tabular-nums">
                      {player.rating}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1">ELO</span>
                  </div>

                  {/* Win Rate */}
                  <div className="hidden sm:block sm:col-span-2 text-right">
                    <span className="text-emerald-400 font-medium tabular-nums">{player.winRate}</span>
                  </div>

                  {/* Badge */}
                  <div className="hidden sm:block sm:col-span-2 text-right">
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        player.badge === 'Grandmaster'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {player.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
