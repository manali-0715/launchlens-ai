import React, { useState } from 'react';
import { 
  Compass, 
  Building2, 
  DollarSign, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles,
  Zap,
  TrendingUp,
  Target
} from 'lucide-react';

export default function CompetitorMatrix({ result, onNavigateTab }) {
  if (!result || !result.competitor_intelligence) {
    return (
      <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
        <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">No Competitor Intel Generated Yet</h3>
        <p className="text-sm text-slate-400 mb-4">Validate a startup concept to map against real Crunchbase competitors.</p>
        <button
          onClick={() => onNavigateTab('validator')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
        >
          Go to Idea Validator
        </button>
      </div>
    );
  }

  const { competitor_intelligence, startup_name, industry } = result;
  const { competitors, positioning_matrix, differentiation_strategy } = competitor_intelligence;
  const [selectedComp, setSelectedComp] = useState(competitors[0] || null);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
              Competitive Landscape Intelligence
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{competitors.length} Direct & Indirect Peers Mapped</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Market Competitor Matrix & Positioning
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Sourced from 5,013 Crunchbase Verified Profiles</span>
        </div>
      </div>

      {/* 2x2 Interactive Positioning Matrix Graphic */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              Strategic 2x2 Positioning Map
            </h2>
            <p className="text-xs text-slate-400">
              Vertical Axis: Innovation & Automation • Horizontal Axis: Market Breadth
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500" />
              <span className="text-slate-300 font-semibold">{startup_name} (Your Startup)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-500" />
              <span className="text-slate-400">Existing Competitor</span>
            </div>
          </div>
        </div>

        {/* The 2x2 Canvas / SVG Grid */}
        <div className="relative w-full aspect-[16/9] max-h-[460px] bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-hidden select-none">
          {/* Quadrant labels */}
          <div className="absolute top-4 left-4 text-[10px] font-bold text-indigo-400/50 uppercase tracking-widest pointer-events-none">
            AI-Native Agile Specialists (Sweet Spot)
          </div>
          <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-500/50 uppercase tracking-widest pointer-events-none">
            Enterprise AI Suites
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] font-bold text-slate-600/40 uppercase tracking-widest pointer-events-none">
            Point-Solution Tools
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-600/40 uppercase tracking-widest pointer-events-none">
            Legacy Incumbent Giants
          </div>

          {/* Grid Center Lines */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-slate-800 border-dashed" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-slate-800 border-dashed" />

          {/* Axis Labels */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            ▲ High AI Automation / Modern Stack
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            ▼ Legacy Manual Workflows
          </div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 -rotate-90">
            Niche Focus ◄
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 rotate-90">
            ► Enterprise Scale
          </div>

          {/* Points */}
          {positioning_matrix.map((pt, i) => {
            // Convert -100..100 coordinates to 10%..90%
            const leftPct = 50 + (pt.x / 200) * 80;
            const topPct = 50 - (pt.y / 200) * 80;
            const isUser = pt.type === 'user';

            return (
              <div
                key={i}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-transform hover:scale-125`}
              >
                {isUser ? (
                  <div className="relative">
                    <span className="absolute -inset-1 rounded-full bg-indigo-500 animate-ping opacity-60" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 border-2 border-white shadow-lg flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-extrabold text-indigo-300 bg-slate-900/90 px-2 py-0.5 rounded border border-indigo-500/40 shadow-md">
                      {pt.name} (You)
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-600 border border-slate-400 group-hover:bg-slate-300 group-hover:border-white shadow-sm" />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 hidden group-hover:block z-20">
                      {pt.name} ({pt.funding})
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitor Cards List & Detail Teardown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Verified Sector Competitors in {industry}
          </h2>
          <p className="text-xs text-slate-400">
            Real market peers identified from our database with funding and vulnerability breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {competitors.map((comp) => {
            const isSelected = selectedComp?.id === comp.id;
            return (
              <div
                key={comp.id}
                onClick={() => setSelectedComp(comp)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/30 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {comp.status}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-400">
                      {comp.total_funding}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{comp.name}</h3>
                  <p className="text-xs text-slate-400 mb-2">{comp.sub_industry}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{comp.geographic_market}</span>
                  <span className="text-indigo-400 font-medium">Inspect →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Competitor Detailed Vulnerability Teardown */}
        {selectedComp && (
          <div className="mt-4 p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>{selectedComp.name}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedComp.competitive_tier}
                  </span>
                </h4>
                <p className="text-xs text-slate-400">{selectedComp.sub_industry} • {selectedComp.geographic_market}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Recorded Total Funding:</span>
                <p className="text-sm font-bold font-mono text-emerald-400">{selectedComp.total_funding}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Competitor Advantage / Moat
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedComp.perceived_strength}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/30">
                <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Vulnerability & Market Gap (Your Opportunity)
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedComp.perceived_weakness}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Differentiation Playbook */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Strategic Differentiation Playbook ("Unfair Advantage")
          </h2>
          <p className="text-xs text-slate-400">
            How {startup_name} structurally out-maneuvers incumbents in {industry}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {differentiation_strategy.map((strat, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>{strat.pillar}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {strat.insight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
