import React from 'react';
import { 
  Compass, 
  BarChart3, 
  ShieldCheck, 
  FileText, 
  Bot, 
  Database, 
  GraduationCap, 
  Sparkles,
  Flame,
  LogOut,
  UserCheck,
  Workflow
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenProjectInfo, 
  currentUser, 
  onLogout 
}) {
  const tabs = [
    { id: 'validator', label: '1. Idea Validator', icon: Sparkles },
    { id: 'feasibility', label: '2. Feasibility Score', icon: BarChart3 },
    { id: 'competitors', label: '3. Competitor Intel', icon: Compass },
    { id: 'insights', label: '4. SWOT & Strategy', icon: ShieldCheck },
    { id: 'business_plan', label: '5. Business Plan', icon: FileText },
    { id: 'copilot', label: '6. AI Co-Pilot', icon: Bot },
    { id: 'explorer', label: '7. Dataset Explorer', icon: Database },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            A.Y. 2026–2027
          </span>
          <span className="hidden sm:inline text-slate-400">
            Department of Information Technology • Control Flow Architecture
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentUser && (
            <div className="flex items-center gap-2 pr-2 border-r border-slate-700/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium hidden md:inline">
                {currentUser.full_name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                {currentUser.role}
              </span>
            </div>
          )}

          <button
            onClick={onOpenProjectInfo}
            className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer"
          >
            <Workflow className="w-3.5 h-3.5 text-cyan-400" />
            <span>Control Flow & Methodology</span>
          </button>

          {currentUser && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors font-medium cursor-pointer pl-1"
              title="Sign Out / Change User"
            >
              <LogOut className="w-3 h-3" />
              <span className="text-[11px]">Sign Out</span>
            </button>
          )}
        </div>
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
