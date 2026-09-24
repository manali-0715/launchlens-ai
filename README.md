# LaunchLens AI – AI-Powered Startup Idea Validation & Business Planning Platform

> **Department of Information Technology • Academic Year 2026–2027**  
> **Software & Artificial Intelligence Track**  

---

## 📌 Abstract & Problem Statement

Startups play a vital role in driving innovation and economic growth. However, according to industry benchmarks, **nearly 90% of startups fail**, primarily because founders launch products without validating real market demand, evaluating competitor moats, or creating structured financial plans.

**LaunchLens AI** addresses this challenge by providing an end-to-end, data-driven platform that acts as a **virtual startup consultant**. It combines **Machine Learning (Random Forest classifier trained on 5,013 Crunchbase-derived startups)** with business intelligence heuristics to compute feasibility scores, map competitors on a dynamic 2x2 matrix, generate actionable SWOT analysis, identify ideal customer profiles, suggest unit economics, and auto-compile investor-ready business plans with PDF export.

---

## 🚀 Key Platform Features

1. **AI Startup Idea Validation & Intake Wizard**:
   - Supports 22 industries, 76 global geographies, flexible business models, and tech stacks.
   - Includes 1-click curated startup theses (AgroPulse AI, MediSync Autonomous, FinVantage Ledger, SkillOrbit VR) for rapid demonstration.

2. **Quantitative Startup Feasibility Scoring (0–100%)**:
   - **5-Pillar Analytical Dimension Breakdown**:
     - *Market Opportunity & Timing (25%)*
     - *Competitive Moat & Advantage (20%)*
     - *Financial Viability & Unit Economics (20%)*
     - *Technical Execution Feasibility (20%)*
     - *Regulatory & Risk Profile (15%)*
   - Stratified into clear feasibility tiers (High Feasibility, Viable with Refinements, Moderate Risk, Speculative).

3. **Machine Learning Success Predictor**:
   - Trained on 997 ground-truth terminal venture outcomes (`Acquired / IPO` vs `Failed / Closed`) from Crunchbase datasets.
   - **Model Metrics**: Test Accuracy = **71.00%**, Precision = **0.7248**, Recall = **0.7383**, ROC-AUC = **0.7534**.
   - Feature importances: Planned log funding, round stages, competitor density, and geographic market.

4. **Competitor Intelligence & 2x2 Positioning Map**:
   - Real-time querying against 5,013 verified companies in `Competitor_Data.csv`.
   - Visual 2x2 interactive scatter positioning grid (*Innovation vs Market Breadth*).
   - Competitor profiles detailing funding levels, perceived strengths, and specific vulnerability gaps.
   - Strategic Differentiation Playbook ("Unfair Advantage").

5. **Dynamic SWOT Matrix & Commercial Blueprint**:
   - 4-quadrant SWOT matrix (Strengths, Weaknesses, Opportunities, Threats) tailored to the entered problem & solution.
   - **Ideal Customer Profile (ICP)**: Primary persona demographics, acute pain points, willingness to pay, and GTM acquisition channels with CAC estimates.
   - **3-Tier Pricing Model**: Starter, Growth (Recommended), and Enterprise tiers.
   - **Unit Economics Engine**: Projected CAC, ARPU, LTV, LTV:CAC ratio (16.7x), Gross Margin (82%), and Payback timeline.

6. **Strategic Risk & Governance Matrix**:
   - Scored on Market, Competitive, Execution, and Runway risks with proactive mitigation protocols.

7. **Automated 8-Chapter Business Plan Generator**:
   - Generates complete, investor-ready business plans (Executive Summary, Architecture, Market Opportunity, Moat, GTM, 3-Year Financial Forecast Table, Roadmap Gantt, Exit Strategy).
   - High-fidelity **PDF Export / Print Layout** with custom print stylesheet.
   - 1-Click Clipboard Markdown Export.

8. **AI Startup Chatbot ("LaunchLens Co-Pilot")**:
   - Real-time conversational AI startup advisor.
   - Pre-loaded with prompt chips: Pitch deck structuring, 4-week lean MVP scoping, customer acquisition playbooks, and pricing optimization.

9. **Live Master Dataset Explorer**:
   - Interactive data table and search engine for all 5,013 Crunchbase companies.
   - Summary tiles (5,011 unique startups, 22 industries, 76 countries, $2.0M median funding).
   - Outcome distribution breakdown (Active, Acquired, IPO, Failed).

---

## 🏗️ Project Architecture & Methodology Flow

```
┌─────────────────────────┐
│   User Startup Idea     │ ◄─── (Intake Form / Sample Thesis)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   AI Processing Engine  │ ◄─── (Feature Engineering & Random Forest ML)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Market & Competitors   │ ◄─── (Querying 5,013 Crunchbase Records)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Business Intelligence  │ ◄─── (5-Pillar Feasibility Scoring & Unit Economics)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   AI Recommendations    │ ◄─── (SWOT, ICP Persona, 3-Tier Pricing, Risks)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Final Report & Dashboard│ ◄─── (Interactive UI, Business Plan PDF, Co-Pilot)
└─────────────────────────┘
```

---

## 💻 Tech Stack

- **Backend**: Python 3.12, FastAPI, Uvicorn, Scikit-Learn, Pandas, NumPy, Joblib, Pydantic
- **Frontend**: React 18, Vite, Tailwind CSS v4, Lucide Icons, Plus Jakarta Sans
- **Dataset**: Crunchbase Venture Stratified Dataset (5,013 Curated Records / 67,021 Pool)
- **Deployment**: Single-port production hosting (FastAPI serves static React build on port 8000)

---

## ⚡ Quick Start & How to Run

### Option 1: Run the Unified Full-Stack Application (Recommended)

1. Make sure Python 3.12 and dependencies are installed:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Start the unified application (serves both API and UI):
   ```bash
   python main.py
   # or
   uvicorn main:app --host 127.0.0.1 --port 8000
   ```

3. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000
   ```

---

### Option 2: Run in Development Mode (Hot-Reload)

1. **Start Backend**:
   ```bash
   cd backend
   uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```

2. **Start Frontend (in another terminal)**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Access the Vite dev server at: `http://localhost:5173`

---

## 📚 References & Literature Citations

1. Brown, T., et al., *"Language Models are Few-Shot Learners,"* NeurIPS, 2023.
2. *"Artificial Intelligence for Startup Decision Support Systems,"* IEEE Xplore Digital Library, 2024.
3. *"Large Language Models for Business Strategy Generation,"* SpringerLink, 2024.
4. *"AI-Driven Market Intelligence for Entrepreneurial Ventures,"* Elsevier ScienceDirect, 2025.
5. *"Intelligent Business Planning Using Generative AI,"* Wiley Online Library, 2025.
