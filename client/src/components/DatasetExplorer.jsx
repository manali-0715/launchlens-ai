import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  TrendingUp, 
  Globe2, 
  Building, 
  DollarSign, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  PieChart
} from 'lucide-react';

export default function DatasetExplorer() {
  const [stats, setStats] = useState(null);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Load summary stats on mount
  useEffect(() => {
    fetch('/api/dataset/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  // Search/Filter startups
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      query,
      industry,
      status,
      page: page.toString(),
      page_size: '15'
    });

    fetch(`/api/dataset/search?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setStartups(data.results || []);
        setTotalPages(data.total_pages || 1);
        setTotalRecords(data.total || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [query, industry, status, page]);

  const industriesList = [
    "All", "SaaS", "HealthTech", "FinTech", "CleanTech", "EdTech", 
    "Cybersecurity", "AI / Machine Learning", "Media & Entertainment", 
    "E-commerce", "MarTech", "DeepTech", "TravelTech", "PropTech", "Mobility"
  ];

  const statusesList = [
    "All", "Active / Ongoing", "Acquired", "IPO", "Failed / Closed"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
              Venture Intelligence Pool
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Stratified Verified Benchmark Data</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            LaunchLens Master Dataset Explorer
          </h1>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Total Deduplicated Pool:</span>
          <p className="text-sm font-bold font-mono text-emerald-400">67,021 Records (5,013 Sample)</p>
        </div>
      </div>

      {/* Summary KPI Tiles */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg text-center">
            <span className="text-[11px] text-slate-400 font-semibold block mb-1">Unique Companies</span>
            <span className="text-2xl font-extrabold text-white font-mono">{stats.unique_companies.toLocaleString()}</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg text-center">
            <span className="text-[11px] text-slate-400 font-semibold block mb-1">Industries & Sectors</span>
            <span className="text-2xl font-extrabold text-indigo-400 font-mono">{stats.unique_industries}</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg text-center">
            <span className="text-[11px] text-slate-400 font-semibold block mb-1">Median Total Funding</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">${(stats.median_funding_usd / 1e6).toFixed(1)}M</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg text-center">
            <span className="text-[11px] text-slate-400 font-semibold block mb-1">Countries Represented</span>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">{stats.unique_countries}</span>
          </div>
        </div>
      )}

      {/* Outcome Distribution Bar Preview */}
      {stats && stats.outcomes && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-indigo-400" />
              Outcome Stratification in Dataset
            </h3>
            <span className="text-[11px] text-slate-500">Kaggle & Crunchbase Verified Ground Truth</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1">Active / Ongoing:</div>
              <div className="text-base font-bold text-blue-400 font-mono">
                {stats.outcomes["Active / Ongoing"]} ({(stats.outcomes["Active / Ongoing"]/50.13).toFixed(1)}%)
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1">Acquired by Incumbent:</div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {stats.outcomes["Acquired"]} ({(stats.outcomes["Acquired"]/50.13).toFixed(1)}%)
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1">Initial Public Offering (IPO):</div>
              <div className="text-base font-bold text-purple-400 font-mono">
                {stats.outcomes["IPO"]} ({(stats.outcomes["IPO"]/50.13).toFixed(1)}%)
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1">Failed / Closed:</div>
              <div className="text-base font-bold text-rose-400 font-mono">
                {stats.outcomes["Failed / Closed"]} ({(stats.outcomes["Failed / Closed"]/50.13).toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Query input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by company name, country..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Industry Filter */}
          <div>
            <select
              value={industry}
              onChange={(e) => { setIndustry(e.target.value); setPage(1); }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {industriesList.map(ind => (
                <option key={ind} value={ind}>Industry: {ind}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {statusesList.map(st => (
                <option key={st} value={st}>Status: {st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Startups Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Startup Name</th>
                <th className="py-3 px-4">Industry / Sub-Sector</th>
                <th className="py-3 px-4">Geography</th>
                <th className="py-3 px-4">Total Funding</th>
                <th className="py-3 px-4">Founded</th>
                <th className="py-3 px-4">Outcome Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-indigo-400" />
                    <span>Querying master dataset...</span>
                  </td>
                </tr>
              ) : startups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No startups matched your search query.
                  </td>
                </tr>
              ) : (
                startups.map((s) => (
                  <tr key={s.startup_id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      {s.name}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div>{s.industry}</div>
                      {s.sub_industry && (
                        <div className="text-[10px] text-slate-500 truncate max-w-xs">{s.sub_industry}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                      {s.city ? `${s.city}, ${s.country}` : s.country}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-400 whitespace-nowrap">
                      {s.funding_usd}
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {s.founded_year || '—'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                        s.status === 'IPO' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' :
                        s.status === 'Acquired' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
                        s.status === 'Failed / Closed' ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' :
                        'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>
            Showing page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong> ({totalRecords} matching startups)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
