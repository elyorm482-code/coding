/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LiveBattlePreview } from './components/LiveBattlePreview';
import { LeaderboardSection } from './components/LeaderboardSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { MatchmakingModal } from './components/MatchmakingModal';
import { AuthModal } from './components/AuthModal';
import { ProgrammingLanguage } from './types';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('javascript');
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; avatar: string; elo: number } | null>(null);

  // Modals state
  const [isMatchmakingOpen, setIsMatchmakingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [targetRoomCode, setTargetRoomCode] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle theme switching on HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (isLightMode) {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [isLightMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleStartCoding = () => {
    // Scroll to interactive preview or open quick queue
    const elem = document.getElementById('battles-preview');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Loaded interactive coding arena session');
  };

  const handleJoinBattle = (roomCode?: string) => {
    setTargetRoomCode(roomCode || '');
    setIsMatchmakingOpen(true);
  };

  const handleMatchFound = (opponent: string) => {
    showToast(`Match established against @${opponent}!`);
  };

  const handleLoginSuccess = (user: { name: string; avatar: string; elo: number }) => {
    setCurrentUser(user);
    showToast(`Authenticated as ${user.name} (${user.elo} ELO)`);
  };

  return (
    <div className={`min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#07090e] text-slate-100'
    }`}>
      {/* Background Animated Particles & Cyber Grid */}
      <ParticleBackground isLight={isLightMode} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel px-4 py-3 rounded-xl border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with 3-Zone contract */}
      <Navbar
        selectedLanguage={selectedLanguage}
        onSelectLanguage={(lang) => {
          setSelectedLanguage(lang);
          showToast(`Switched active language to ${lang.toUpperCase()}`);
        }}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode(!isLightMode)}
        onOpenSignIn={() => setIsAuthModalOpen(true)}
        onOpenGetStarted={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          selectedLanguage={selectedLanguage}
          onStartCoding={handleStartCoding}
          onJoinBattle={() => handleJoinBattle()}
        />

        {/* 4 Premium Metric Cards */}
        <StatsSection />

        {/* Live Battle Preview Section */}
        <LiveBattlePreview
          selectedLanguage={selectedLanguage}
          onJoinMatch={() => handleJoinBattle()}
        />

        {/* Feature Cards Section */}
        <FeaturesSection
          onExploreFeature={(id) => {
            if (id === 'realtime-battles' || id === 'multiplayer-rooms') {
              handleJoinBattle();
            } else if (id === 'global-leaderboard') {
              const el = document.getElementById('leaderboard');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
              handleStartCoding();
            }
          }}
        />

        {/* 3-Step How It Works Section */}
        <HowItWorksSection onJoinRoomClick={() => handleJoinBattle()} />

        {/* Global Leaderboard Section */}
        <LeaderboardSection />

        {/* Premium CTA Section */}
        <CtaSection onStartFirstBattle={(code) => handleJoinBattle(code)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Matchmaking Modal */}
      <MatchmakingModal
        isOpen={isMatchmakingOpen}
        onClose={() => setIsMatchmakingOpen(false)}
        initialRoomCode={targetRoomCode}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onMatchFound={handleMatchFound}
      />

      {/* Interactive Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
