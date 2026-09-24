import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  AlertOctagon, 
  Users, 
  DollarSign, 
  Check, 
  ArrowRight,
  Sparkles,
  PieChart,
  Layers,
  HelpCircle
} from 'lucide-react';

export default function SwotAndStrategy({ result, onNavigateTab }) {
  if (!result || !result.validation_insights) {
    return (
      <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
        <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">No Strategy Insights Generated Yet</h3>
        <p className="text-sm text-slate-400 mb-4">Validate an idea first to view tailored SWOT, ICP, and pricing models.</p>
        <button
          onClick={() => onNavigateTab('validator')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
        >
          Go to Idea Validator
        </button>
      </div>
    );
  }

  const { validation_insights, startup_name, industry } = result;
  const { swot_analysis, target_persona, pricing_strategy, risk_assessment } = validation_insights;
  const [activeSubTab, setActiveSubTab] = useState('swot'); // 'swot', 'icp', 'pricing', 'risks'

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
              Strategic Commercial Blueprint
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{industry} Sector</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            SWOT Analysis, ICP & Revenue Architecture
          </h1>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('swot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'swot' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            SWOT Analysis
          </button>
          <button
            onClick={() => setActiveSubTab('icp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'icp' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Target ICP
          </button>
          <button
            onClick={() => setActiveSubTab('pricing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'pricing' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pricing & Unit Economics
          </button>
          <button
            onClick={() => setActiveSubTab('risks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'risks' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Risk Matrix
          </button>
        </div>
      </div>

      {/* VIEW 1: SWOT Matrix */}
      {activeSubTab === 'swot' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-slate-900/90 border border-emerald-900/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/30">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Strengths (Internal)</h3>
                    <p className="text-[11px] text-slate-400">Core organizational and technological advantages</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {swot_analysis.strengths.length} Factors
                </span>
              </div>
              <ul className="space-y-3">
                {swot_analysis.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Weaknesses (Internal)</h3>
                    <p className="text-[11px] text-slate-400">Vulnerabilities to address and de-risk</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {swot_analysis.weaknesses.length} Factors
                </span>
              </div>
              <ul className="space-y-3">
                {swot_analysis.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-slate-900/90 border border-blue-900/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/30">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Opportunities (External)</h3>
                    <p className="text-[11px] text-slate-400">Market trends and macro tailwinds</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {swot_analysis.opportunities.length} Factors
                </span>
              </div>
              <ul className="space-y-3">
                {swot_analysis.opportunities.map((o, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-slate-900/90 border border-rose-900/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-900/30">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Threats (External)</h3>
                    <p className="text-[11px] text-slate-400">Competitive moves and environmental friction</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {swot_analysis.threats.length} Factors
                </span>
              </div>
              <ul className="space-y-3">
                {swot_analysis.threats.map((t, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Target Audience & ICP */}
      {activeSubTab === 'icp' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary ICP Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Core Target Persona
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    {target_persona.primary_icp.segment_name}
                  </h3>
                </div>
                <Users className="w-6 h-6 text-indigo-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Demographics & Role:</span>
                  <p className="text-slate-200">{target_persona.primary_icp.demographics}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Organization Size:</span>
                  <p className="text-slate-200">{target_persona.primary_icp.organization_size}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Target Geography:</span>
                  <p className="text-slate-200">{target_persona.primary_icp.geography}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Acute Pain Points:</span>
                  <ul className="space-y-1.5 pl-1">
                    {target_persona.primary_icp.core_pain_points.map((pt, i) => (
                      <li key={i} className="text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 font-semibold block mb-0.5">Willingness to Pay:</span>
                  <p className="text-emerald-400 font-bold">{target_persona.primary_icp.willingness_to_pay}</p>
                </div>
              </div>
            </div>

            {/* Secondary Segment & Acquisition Channels */}
            <div className="space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Secondary Expansion Segment
                </span>
                <h4 className="text-base font-bold text-white">
                  {target_persona.secondary_icp.segment_name}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {target_persona.secondary_icp.description}
                </p>
                <p className="text-xs font-semibold text-emerald-400">
                  Expected Contract Value: {target_persona.secondary_icp.willingness_to_pay}
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  Customer Acquisition Channels (GTM)
                </h4>
                <div className="space-y-3">
                  {target_persona.acquisition_channels.map((chan, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{chan.channel}</span>
                        <span className="font-mono text-emerald-400">{chan.cac_estimate}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{chan.tactics}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Pricing & Unit Economics */}
      {activeSubTab === 'pricing' && (
        <div className="space-y-6">
          {/* Unit Economics Highlight Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-900/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
              <PieChart className="w-4 h-4" />
              SaaS Unit Economics Forecast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">Blended CAC</span>
                <span className="text-base font-extrabold text-white font-mono">{pricing_strategy.projected_unit_economics.estimated_cac}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">Projected ARPU</span>
                <span className="text-base font-extrabold text-white font-mono">{pricing_strategy.projected_unit_economics.average_revenue_per_user_arpu}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">Estimated LTV</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">{pricing_strategy.projected_unit_economics.projected_ltv}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">LTV : CAC</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">{pricing_strategy.projected_unit_economics.ltv_to_cac_ratio.split(' ')[0]}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">Gross Margin</span>
                <span className="text-base font-extrabold text-white font-mono">{pricing_strategy.projected_unit_economics.gross_margin}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">CAC Payback</span>
                <span className="text-base font-extrabold text-cyan-400 font-mono">{pricing_strategy.projected_unit_economics.months_to_cac_payback}</span>
              </div>
            </div>
          </div>

          {/* Pricing Tiers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing_strategy.tiers.map((tier, idx) => {
              const isPopular = tier.popular;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                    isPopular
                      ? 'bg-slate-900 border-2 border-indigo-500 shadow-xl shadow-indigo-500/10'
                      : 'bg-slate-900/80 border border-slate-800'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-600 text-white shadow-md">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{tier.tier_name}</h4>
                    <p className="text-xs text-slate-400 mb-4">{tier.target}</p>
                    <div className="text-2xl font-extrabold text-white font-mono mb-6">
                      {tier.price}
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-300">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className={`mt-8 w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: Risk Matrix */}
      {activeSubTab === 'risks' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Strategic Risk & Governance Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Severity, likelihood, and proactive mitigation playbooks across four key risk vectors.
            </p>
          </div>

          <div className="space-y-4">
            {risk_assessment.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <h4 className="text-sm font-bold text-white">{r.category}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Likelihood: <strong className="text-white">{r.likelihood}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Impact: <strong className="text-white">{r.impact}</strong>
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                      r.score >= 6 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      Score: {r.score}/9
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 pl-5">
                  <strong className="text-slate-400">Identified Vulnerability:</strong> {r.risk}
                </p>

                <div className="pl-5 text-xs text-emerald-400 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30">
                  <strong className="text-emerald-300">Mitigation Protocol:</strong> {r.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
