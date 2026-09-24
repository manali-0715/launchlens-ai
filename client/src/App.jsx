import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IdeaInputForm from './components/IdeaInputForm';
import FeasibilityDashboard from './components/FeasibilityDashboard';
import CompetitorMatrix from './components/CompetitorMatrix';
import SwotAndStrategy from './components/SwotAndStrategy';
import BusinessPlanGenerator from './components/BusinessPlanGenerator';
import AiChatbot from './components/AiChatbot';
import DatasetExplorer from './components/DatasetExplorer';
import ProjectInfoModal from './components/ProjectInfoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('validator');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sampleIdeas, setSampleIdeas] = useState([]);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    startup_name: "LaunchLens AI",
    industry: "SaaS",
    sub_industry: "Startup Decision Support & Machine Learning",
    problem: "Nearly 90% of early-stage startups fail primarily because founders launch products without empirical market validation, competitor research, or structured unit-economics planning.",
    solution: "An end-to-end intelligent platform providing real-time feasibility scoring, 5,000+ verified competitor benchmark analysis, automated SWOT generation, and investor-ready business plans.",
    target_audience: "First-time founders, collegiate entrepreneurship cells, and angel syndicates",
    business_model: "B2B SaaS",
    planned_funding_usd: 500000,
    planned_rounds: 2,
    competition_level: "Medium",
    country: "India",
    tech_stack: "React, Vite, Tailwind CSS, Python, FastAPI, Scikit-Learn"
  });

  // Fetch sample ideas and run initial validation on mount
  useEffect(() => {
    fetch('/api/sample-ideas')
      .then(res => res.json())
      .then(data => {
        setSampleIdeas(data);
      })
      .catch(err => console.error("Error loading sample ideas:", err));

    // Run initial validation so dashboard is pre-populated
    handleValidate(formData, false);
  }, []);

  const handleValidate = async (dataToValidate, switchTab = true) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToValidate || formData)
      });
      const data = await res.json();
      setResult(data);
      if (switchTab) {
        setActiveTab('feasibility');
      }
    } catch (err) {
      console.error("Validation request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = (sample) => {
    setFormData(sample);
    handleValidate(sample, true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenProjectInfo={() => setIsModalOpen(true)} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'validator' && (
          <IdeaInputForm
            formData={formData}
            setFormData={setFormData}
            onValidate={(data) => handleValidate(data, true)}
            isLoading={isLoading}
            sampleIdeas={sampleIdeas}
            onLoadSample={handleLoadSample}
          />
        )}

        {activeTab === 'feasibility' && (
          <FeasibilityDashboard
            result={result}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'competitors' && (
          <CompetitorMatrix
            result={result}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'insights' && (
          <SwotAndStrategy
            result={result}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'business_plan' && (
          <BusinessPlanGenerator
            result={result}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'copilot' && (
          <AiChatbot
            result={result}
          />
        )}

        {activeTab === 'explorer' && (
          <DatasetExplorer />
        )}
      </main>

      {/* Platform Footer */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-900/60 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-slate-200">
              LaunchLens AI • AI-Powered Startup Idea Validation Platform
            </p>
            <p className="text-slate-500">
              Department of Information Technology • Academic Year 2026–2027
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline underline-offset-2"
            >
              Methodology & Research Overview
            </button>
          </div>
        </div>
      </footer>

      {/* Project Info & Team Modal */}
      <ProjectInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
