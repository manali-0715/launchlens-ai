import React from 'react';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  Workflow, 
  Database,
  CheckCircle2
} from 'lucide-react';

export default function ProjectInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const papers = [
    { title: "Artificial Intelligence for Startup Decision Support Systems", publisher: "IEEE, 2024", summary: "Explores AI techniques for evaluating startup feasibility and business decision-making." },
    { title: "Large Language Models for Business Strategy Generation", publisher: "Springer, 2024", summary: "Demonstrates how LLMs assist in generating business plans and strategic recommendations." },
    { title: "AI-Driven Market Intelligence for Entrepreneurial Ventures", publisher: "Elsevier, 2025", summary: "Discusses AI methods for competitor analysis, customer segmentation, and market trend prediction." },
    { title: "Intelligent Business Planning Using Generative AI", publisher: "Wiley, 2025", summary: "Presents AI frameworks that automate startup planning and business model generation." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Research & Architecture Overview
              </span>
              <span className="text-xs text-slate-400">A.Y. 2026–2027</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              LaunchLens AI
            </h2>
            <p className="text-xs text-slate-400">
              AI-Powered Startup Idea Validation & Business Planning Platform
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Department & Empirical Foundation Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 font-semibold block mb-0.5">Academic Department:</span>
            <p className="text-white font-bold">Department of Information Technology</p>
            <p className="text-slate-400">Software & Artificial Intelligence Track</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 font-semibold block mb-0.5">Empirical Dataset:</span>
            <p className="text-white font-bold">Crunchbase Stratified Venture Pool</p>
            <p className="text-slate-400">5,013 Curated Records • 22 Industries • 76 Countries</p>
          </div>
        </div>

        {/* Methodology & Block Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-400" />
            Project Architecture & Methodology Flow
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-slate-200">
              1. User Startup Idea
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-indigo-300">
              2. AI Processing Engine
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-cyan-300">
              3. Market & Competitors
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-blue-300">
              4. Business Intelligence
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-emerald-300">
              5. AI Strategy
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-amber-300">
              6. Final Validation & Plan
            </div>
          </div>
        </div>

        {/* Literature Review Citations */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Literature Review & Research Foundations
          </h3>
          <div className="space-y-2">
            {papers.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
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
