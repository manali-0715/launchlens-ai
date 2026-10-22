import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  BarChart3, 
  ShieldCheck, 
  FileText, 
  Bot, 
  Database, 
  Sparkles,
  Flame,
  LogOut,
  User,
  ChevronDown,
  Mail,
  Shield,
  CheckCircle2
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onLogout 
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const tabs = [
    { id: 'validator', label: '1. Idea Validator', icon: Sparkles },
    { id: 'feasibility', label: '2. Feasibility Score', icon: BarChart3 },
    { id: 'competitors', label: '3. Competitor Intel', icon: Compass },
    { id: 'insights', label: '4. SWOT & Strategy', icon: ShieldCheck },
    { id: 'business_plan', label: '5. Business Plan', icon: FileText },
    { id: 'copilot', label: '6. AI Co-Pilot', icon: Bot },
    { id: 'explorer', label: '7. Dataset Explorer', icon: Database },
  ];

  // Close profile dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Notification / System Strip */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            A.Y. 2026–2027
          </span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Department of Information Technology • LaunchLens AI Platform
          </span>
        </div>

        {/* Right Corner: Prominent User Profile Pill */}
        {currentUser && (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 transition-all cursor-pointer group shadow-sm"
              title="View Profile Details"
            >
              {/* Avatar circle with initials */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white font-bold text-[10px] flex items-center justify-center ring-1 ring-white/30 shadow-sm">
                {getInitials(currentUser.full_name)}
              </div>

              {/* Name & Role */}
              <div className="flex items-center gap-1.5 text-left">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {currentUser.full_name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hidden md:inline font-medium">
                  {currentUser.role}
                </span>
              </div>

              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Card */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl p-4 text-xs space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Header in dropdown */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
                    {getInitials(currentUser.full_name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white text-sm truncate">
                      {currentUser.full_name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-2 py-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-indigo-400" />
                      Role
                    </span>
                    <span className="font-semibold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {currentUser.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Session Status
                    </span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Authenticated
                    </span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-500 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('validator')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  LaunchLens<span className="text-indigo-400 font-extrabold">.AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ML Model v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                AI-Powered Startup Idea Validation & Business Planning Platform
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile / Tablet Horizontal Nav Scroll */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
