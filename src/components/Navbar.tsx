import React, { useState, useEffect } from 'react';
import { Swords, ChevronDown, Sun, Moon, Menu, X, User } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import { ProgrammingLanguage } from '../types';

interface NavbarProps {
  selectedLanguage: ProgrammingLanguage;
  onSelectLanguage: (lang: ProgrammingLanguage) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  onOpenSignIn: () => void;
  onOpenGetStarted: () => void;
  currentUser?: { name: string; avatar: string; elo: number } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedLanguage,
  onSelectLanguage,
  isLightMode,
  onToggleTheme,
  onOpenSignIn,
  onOpenGetStarted,
  currentUser,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLang = LANGUAGES.find((l) => l.id === selectedLanguage) || LANGUAGES[0];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#07090e]/85 dark:bg-[#07090e]/85 light:bg-white/90 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-slate-200/80 shadow-lg shadow-black/20'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2.5">
            <a
              href="#"
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="CodeBattle Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-sm shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center transition-colors group-hover:bg-[#0c1220]">
                  <Swords className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent dark:from-white dark:to-slate-300 light:from-slate-900 light:to-slate-700">
                Code<span className="text-cyan-400">Battle</span>
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-600">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-cyan-400 transition-colors focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('battles-preview')}
              className="hover:text-cyan-400 transition-colors focus:outline-none"
            >
              Battles
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-cyan-400 transition-colors focus:outline-none"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-cyan-400 transition-colors focus:outline-none"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('leaderboard')}
              className="hover:text-cyan-400 transition-colors focus:outline-none"
            >
              Leaderboard
            </button>
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors"
                aria-expanded={isLangDropdownOpen}
                aria-label="Select programming language"
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: activeLang.color }}
                />
                <span className="hidden sm:inline font-mono">{activeLang.name}</span>
                <span className="sm:hidden font-mono text-[11px]">.{activeLang.extension}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isLangDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-44 rounded-xl glass-panel py-1.5 shadow-2xl z-20 border border-white/10 dark:border-white/10 light:border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5 mb-1">
                      Target Language
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          onSelectLanguage(lang.id);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                          selectedLanguage === lang.id
                            ? 'bg-cyan-500/15 text-cyan-400 font-semibold'
                            : 'text-slate-300 hover:bg-white/5 dark:text-slate-300 light:text-slate-700 light:hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                          <span>{lang.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          .{lang.extension}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors focus:outline-none"
              aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
              title={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {isLightMode ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* User or Auth buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-1">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-cyan-500/30 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono font-medium text-cyan-300">{currentUser.name}</span>
                  <span className="text-slate-400 text-[10px] tabular-nums font-mono">{currentUser.elo} ELO</span>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onOpenSignIn}
                  className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-white transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={onOpenGetStarted}
                  className="relative group overflow-hidden px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('battles-preview')}
              className="text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-200"
            >
              Battles
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('leaderboard')}
              className="text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-200"
            >
              Leaderboard
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {!currentUser && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="flex-1 py-2 text-center rounded-lg border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenGetStarted();
                  }}
                  className="flex-1 py-2 text-center rounded-lg bg-cyan-500 text-xs font-semibold text-white hover:bg-cyan-400"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
