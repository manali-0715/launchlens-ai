import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  DollarSign, 
  Globe2, 
  Layers, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

export default function IdeaInputForm({ 
  formData, 
  setFormData, 
  onValidate, 
  isLoading, 
  sampleIdeas, 
  onLoadSample 
}) {
  const industries = [
    "SaaS",
    "HealthTech",
    "FinTech",
    "CleanTech",
    "EdTech",
    "Cybersecurity",
    "AI / Machine Learning",
    "Media & Entertainment",
    "E-commerce",
    "MarTech",
    "DeepTech",
    "TravelTech",
    "PropTech",
    "Mobility",
    "HRTech",
    "BioTech",
    "Gaming",
    "AgTech",
    "Other / Unspecified"
  ];

  const businessModels = [
    "B2B SaaS",
    "Subscription (B2B)",
    "Subscription (B2C)",
    "Marketplace / Platform",
    "API / Usage-based",
    "Freemium Software",
    "Direct-to-Consumer (D2C)",
    "Hardware + Software",
    "Transactional Fee"
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "India",
    "Canada",
    "Germany",
    "France",
    "Israel",
    "Singapore",
    "Australia",
    "Japan",
    "Brazil",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onValidate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Empirical Validation Engine • 5,000+ Real Crunchbase Benchmark Startups</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Validate Your Startup Idea Before Building
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Get an instant <span className="text-indigo-300 font-semibold">Feasibility Score</span>, machine-learning success probability, competitor positioning map, SWOT analysis, and investor-ready business plan.
        </p>
      </div>

      {/* Quick Pre-filled Sample Ideas */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Load a Curated Startup Thesis (One-Click Test)</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Select one to populate form</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {sampleIdeas.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onLoadSample(sample)}
              className="text-left p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-indigo-300 mb-1">
                <span>{sample.startup_name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                  {sample.industry}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {sample.problem}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Validation Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Startup Concept & Market Profile
            </h2>
            <p className="text-xs text-slate-400">
              Provide your core hypothesis. All fields are analyzed by our ML classifier.
            </p>
          </div>
        </div>

        {/* Row 1: Name, Industry, Country */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Startup / Project Name *
            </label>
            <input
              type="text"
              name="startup_name"
              required
              value={formData.startup_name}
              onChange={handleChange}
              placeholder="e.g. NextGen Telehealth"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Industry *
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Geographic Market *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              {countries.map(cnt => (
                <option key={cnt} value={cnt}>{cnt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Problem Statement */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              The Pain Point / Problem Statement *
            </label>
            <span className="text-[11px] text-slate-500">
              {formData.problem.length} characters
            </span>
          </div>
          <textarea
            name="problem"
            required
            rows={3}
            value={formData.problem}
            onChange={handleChange}
            placeholder="Describe the urgent problem your target customer experiences today..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Solution Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Proposed Solution & Unique Value Proposition *
            </label>
            <span className="text-[11px] text-slate-500">
              {formData.solution.length} characters
            </span>
          </div>
          <textarea
            name="solution"
            required
            rows={3}
            value={formData.solution}
            onChange={handleChange}
            placeholder="How does your product solve this problem 10x better, faster, or cheaper than current alternatives?"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Row 2: Target Audience, Business Model, Competition */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Audience / ICP
            </label>
            <input
              type="text"
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              placeholder="e.g. B2B DevOps Engineers & CTOs"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Business Model
            </label>
            <select
              name="business_model"
              value={formData.business_model}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              {businessModels.map(bm => (
                <option key={bm} value={bm}>{bm}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Market Competition Level
            </label>
            <select
              name="competition_level"
              value={formData.competition_level}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="Low">Low (Fragmented / Green-field)</option>
              <option value="Medium">Medium (A few noticeable players)</option>
              <option value="High">High (Heavily saturated market)</option>
            </select>
          </div>
        </div>

        {/* Row 3: Planned Capital & Tech Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Planned Initial Funding ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">$</span>
              <input
                type="number"
                name="planned_funding_usd"
                value={formData.planned_funding_usd}
                onChange={handleChange}
                min={10000}
                max={50000000}
                step={25000}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Benchmark median: ~$2,000,000
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Funding Rounds
            </label>
            <select
              name="planned_rounds"
              value={formData.planned_rounds}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value={1}>1 Round (Pre-Seed / Angel)</option>
              <option value={2}>2 Rounds (Seed + Series A)</option>
              <option value={3}>3 Rounds (Up to Series B)</option>
              <option value={4}>4+ Rounds (Multi-stage Growth)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Tech Stack
            </label>
            <input
              type="text"
              name="tech_stack"
              value={formData.tech_stack}
              onChange={handleChange}
              placeholder="e.g. React, Python, FastAPI, AWS"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Machine Learning Evaluation...</span>
              </>
            ) : (
              <>
                <span>Run Feasibility Validation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
