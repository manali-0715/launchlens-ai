import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Cpu, 
  ArrowRight,
  Target,
  DollarSign,
  Scale,
  Award
} from 'lucide-react';

export default function FeasibilityDashboard({ result, onNavigateTab }) {
  if (!result || !result.feasibility) {
    return (
      <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
        <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">No Idea Validated Yet</h3>
        <p className="text-sm text-slate-400 mb-4">Submit your startup thesis in the Idea Validator to compute feasibility metrics.</p>
        <button
          onClick={() => onNavigateTab('validator')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
        >
          Go to Idea Validator
        </button>
      </div>
    );
  }

  const { feasibility, startup_name, industry, country } = result;
  const score = feasibility.overall_feasibility_score;
  const mlProb = feasibility.ml_success_probability;
  const dimensions = feasibility.dimensions;
  const benchmarks = feasibility.industry_benchmarks;

  // Compute stroke offset for 0-100 radial ring
  const strokeDash = 2 * Math.PI * 45;
  const strokeOffset = strokeDash - (score / 100) * strokeDash;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
              Feasibility Audit Report
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{industry} ({country})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {startup_name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('competitors')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <span>View Competitors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab('business_plan')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Generate Business Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top Cards: Score Gauge + ML Prediction + Benchmark Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Radial Feasibility Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Overall Feasibility Score
          </h3>

          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-indigo-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={strokeDash}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {score}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                / 100
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              score >= 80 ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
              score >= 65 ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' :
              score >= 50 ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
              'bg-rose-500/15 text-rose-300 border border-rose-500/30'
            }`}>
              <Award className="w-3.5 h-3.5" />
              {feasibility.feasibility_tier}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 max-w-xs leading-relaxed">
            Synthesized across 5 analytical dimensions with empirical market calibration.
          </p>
        </div>

        {/* Card 2: ML Model Prediction */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                ML Exit Probability
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Random Forest
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {mlProb}%
              </span>
              <span className="text-xs text-slate-400">
                Projected Liquidity / Exit
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-4">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${mlProb}%` }}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Statistical likelihood of achieving a liquidity milestone (M&A Acquisition or IPO) compared to liquidation / shutdown.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Classifier Test Accuracy:</span>
            <span className="font-mono font-semibold text-emerald-400">{feasibility.ml_accuracy_benchmark}</span>
          </div>
        </div>

        {/* Card 3: Sector Benchmark vs 5,000+ Startups */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                {industry} Benchmark
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Crunchbase Real Data
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Historical Sector Exit Rate:</span>
                <span className="font-semibold text-white">{benchmarks.historical_exit_rate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Median Industry Funding:</span>
                <span className="font-semibold text-white font-mono">
                  ${(benchmarks.median_funding_usd / 1e6).toFixed(1)}M
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Avg Rounds to Liquidity:</span>
                <span className="font-semibold text-white font-mono">{benchmarks.avg_rounds_to_exit}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Sector Competitor Density:</span>
                <span className="font-semibold text-white font-mono">{benchmarks.avg_competitor_density} per subsector</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Sample size in dataset:</span>
            <span className="font-mono font-semibold text-indigo-300">{benchmarks.dataset_sample_count} companies</span>
          </div>
        </div>
      </div>

      {/* 5 Analytical Dimensions Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            5-Pillar Feasibility Dimension Breakdown
          </h2>
          <p className="text-xs text-slate-400">
            Weighted assessment of commercial, competitive, financial, technical, and regulatory viability.
          </p>
        </div>

        <div className="space-y-5">
          {Object.entries(dimensions).map(([key, dim]) => {
            const titleMap = {
              market_opportunity: { title: "Market Opportunity & Timing", icon: TrendingUp },
              competitive_moat: { title: "Competitive Moat & Difficulty", icon: ShieldAlert },
              financial_viability: { title: "Financial Viability & Unit Economics", icon: DollarSign },
              technical_feasibility: { title: "Technical Feasibility & Architecture", icon: Cpu },
              regulatory_risk: { title: "Regulatory & Compliance Risk", icon: Scale }
            };
            const meta = titleMap[key] || { title: key, icon: Sparkles };
            const Icon = meta.icon;

            return (
              <div key={key} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 transition-all hover:border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white mr-2">{meta.title}</span>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        (Weight: {dim.weight})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-white font-mono">
                      {dim.score}
                    </span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      dim.score >= 80 ? 'bg-emerald-500' :
                      dim.score >= 65 ? 'bg-indigo-500' :
                      dim.score >= 50 ? 'bg-amber-500' :
                      'bg-rose-500'
                    }`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400">{dim.analysis}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drivers vs Critical Risks Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Drivers */}
        <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Key Growth Catalysts</span>
          </div>
          <ul className="space-y-2.5">
            {feasibility.key_growth_drivers.map((drv, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{drv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Flags */}
        <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Critical Strategic Vulnerabilities</span>
          </div>
          <ul className="space-y-2.5">
            {feasibility.critical_risk_flags.map((risk, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
