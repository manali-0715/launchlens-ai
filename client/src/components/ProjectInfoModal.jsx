import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  Workflow, 
  Database,
  CheckCircle2,
  Lock,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react';

export default function ProjectInfoModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('diagram'); // 'diagram' or 'papers'

  if (!isOpen) return null;

  const papers = [
    { title: "Artificial Intelligence for Startup Decision Support Systems", publisher: "IEEE, 2024", summary: "Explores AI techniques for evaluating startup feasibility and business decision-making." },
    { title: "Large Language Models for Business Strategy Generation", publisher: "Springer, 2024", summary: "Demonstrates how LLMs assist in generating business plans and strategic recommendations." },
    { title: "AI-Driven Market Intelligence for Entrepreneurial Ventures", publisher: "Elsevier, 2025", summary: "Discusses AI methods for competitor analysis, customer segmentation, and market trend prediction." },
    { title: "Intelligent Business Planning Using Generative AI", publisher: "Wiley, 2025", summary: "Presents AI frameworks that automate startup planning and business model generation." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                System Specification • A.Y. 2026–2027
              </span>
              <span className="text-xs text-slate-400">Department of Information Technology</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              LaunchLens AI • Control Flow & Architecture
            </h2>
            <p className="text-xs text-slate-400">
              Control Flow Diagram, Authentication Gate, and 7-Module Analytical Engine
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'diagram'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Control Flow Diagram (System Flowchart)
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'papers'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Literature Review & Research (IEEE, Springer)
          </button>
        </div>

        {activeTab === 'diagram' && (
          <div className="space-y-6">
            {/* Control Flow Visual Representation */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  Control Flow Diagram – LaunchLens AI
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  AI-Powered Startup Idea Validation & Business Planning Platform
                </h4>
              </div>

              {/* Start & Open Website */}
              <div className="flex flex-col items-center space-y-2">
                <div className="px-6 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold shadow-sm">
                  Start
                </div>
                <ArrowDown className="w-4 h-4 text-slate-500" />
                <div className="px-6 py-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-semibold">
                  Open Website LaunchLens AI
                </div>
                <ArrowDown className="w-4 h-4 text-slate-500" />
              </div>

              {/* Login / Register & Validation Decision */}
              <div className="flex flex-col items-center space-y-2 relative">
                <div className="px-7 py-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Login / Register Gateway</span>
                </div>
                <ArrowDown className="w-4 h-4 text-slate-500" />

                {/* Diamond Decision */}
                <div className="relative p-3 rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 text-amber-300 text-xs font-bold text-center">
                  <div>Valid Credentials?</div>
                  <div className="text-[10px] text-amber-400/80 font-normal">
                    (Checks Password Hash via PBKDF2 & SQLite)
                  </div>
                </div>

                <div className="flex items-center justify-between w-full max-w-md text-[11px] px-8 text-slate-400">
                  <span className="text-rose-400 flex items-center gap-1 font-semibold">
                    ← No: Reject & Return to Login
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    Yes: Unlock Dashboard ↓
                  </span>
                </div>

                <ArrowDown className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Central Dashboard */}
              <div className="text-center">
                <div className="inline-block px-8 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/40 text-xs font-extrabold shadow-lg shadow-emerald-500/10">
                  Dashboard (Select Module)
                </div>
              </div>

              {/* 7 Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-2.5 pt-2">
                {/* 1. Idea Validator */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-blue-500/30 flex flex-col justify-between text-center space-y-1">
                  <div className="text-[11px] font-bold text-blue-300 bg-blue-500/10 py-1 rounded">1. Idea Validator</div>
                  <div className="text-[10px] text-slate-300">Enter startup thesis details (name, problem, solution, funding)</div>
                  <div className="text-[9px] text-slate-400 bg-slate-950 p-1 rounded">Check market need & validate input</div>
                  <div className="text-[9px] font-semibold text-blue-400">Display validation status</div>
                </div>

                {/* 2. Feasibility Score */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 flex flex-col justify-between text-center space-y-1">
                  <div className="text-[11px] font-bold text-purple-300 bg-purple-500/10 py-1 rounded">2. Feasibility Score</div>
                  <div className="text-[10px] text-slate-300">Process input using Random Forest ML Model</div>
                  <div className="text-[9px] text-slate-400 bg-slate-950 p-1 rounded">Calculate 5-pillar scores (0-100)</div>
                  <div className="text-[9px] font-semibold text-purple-400">Display exit probability</div>
                </div>

                {/* 3. Competitor Intel */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 flex flex-col justify-between text-center space-y-1">
                  <div className="text-[11px] font-bold text-amber-300 bg-amber-500/10 py-1 rounded">3. Competitor Intel</div>
                  <div className="text-[10px] text-slate-300">Fetch peer data from 5,013 Crunchbase records</div>
                  <div className="text-[9px] text-slate-400 bg-slate-950 p-1 rounded">Analyze & generate 2x2 positioning map</div>
                  <div className="text-[9px] font-semibold text-amber-400">Display competitor list & moat</div>
                </div>

                {/* 4. SWOT & Strategy */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col justify-between text-center space-y-1">
                  <div className="text-[11px] font-bold text-cyan-300 bg-cyan-500/10 py-1 rounded">4. SWOT & Strategy</div>
                  <div className="text-[10px] text-slate-300">Generate 4-quadrant SWOT matrix & customer ICP</div>
                  <div className="text-[9px] text-slate-400 bg-slate-950 p-1 rounded">3-Tier Pricing & Risk assessment</div>
                  <div className="text-[9px] font-semibold text-cyan-400">Display strategic actions</div>
                </div>

                {/* 5. Business Plan */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-yellow-500/30 flex flex-col justify-between text-center space-y-1">
                  <div className="text-[11px] font-bold text-yellow-300 bg-yellow-500/10 py-1 rounded">5. Business Plan</div>
                  <div className="text-[10px] text-slate-300">Compile analysis results into 8 chapters</div>
                  <div className="text-[9px] text-slate-400 bg-slate-950 p-1 rounded">Generate plan (JSON / PDF)</div>
                  <div className="text-[9px] font-semibold text-yellow-400">Option to download / print</div>
                </div>

                {/* 6. AI Co-Pilot */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-pink-500/30 flex flex-col justify-between text-center space-y-1">
                  <div className="text-[11px] font-bold text-pink-300 bg-pink-500/10 py-1 rounded">6. AI Co-Pilot</div>
                  <div className="text-[10px] text-slate-300">Enter founder query or pitch prompt</div>
                  <div className="text-[9px] text-slate-400 bg-slate-950 p-1 rounded">Process query with venture context</div>
                  <div className="text-[9px] font-semibold text-pink-400">Display AI recommendations</div>
                </div>

                {/* 7. Dataset Explorer */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col justify-between text-center space-y-1">
                  <div className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 py-1 rounded">7. Dataset Explorer</div>
                  <div className="text-[10px] text-slate-300">Enter search / filter by sector, country</div>
                  <div className="text-[9px] text-slate-400 bg-slate-950 p-1 rounded">Fetch & filter real dataset records</div>
                  <div className="text-[9px] font-semibold text-emerald-400">Display startup statistics</div>
                </div>
              </div>

              {/* End & Loop Decision */}
              <div className="flex flex-col items-center space-y-2 pt-2">
                <ArrowDown className="w-4 h-4 text-slate-500" />
                <div className="px-5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold text-center">
                  Want to use another module?
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                    (Yes → Select from top navigation bar • No → Sign Out / End)
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 text-slate-500" />
                <div className="px-6 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold">
                  End
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'papers' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-semibold block mb-0.5">Academic Track:</span>
                <p className="text-white font-bold">Department of Information Technology</p>
                <p className="text-slate-400">Software & Artificial Intelligence Track (A.Y. 2026–2027)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-semibold block mb-0.5">Empirical Dataset:</span>
                <p className="text-white font-bold">Crunchbase Stratified Venture Pool</p>
                <p className="text-slate-400">5,013 Curated Records • 22 Industries • 76 Countries</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Published Academic Literature Citations:
              </h4>
              {papers.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between font-bold text-white mb-0.5">
                    <span>{p.title}</span>
                    <span className="text-[10px] text-indigo-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {p.publisher}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{p.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
