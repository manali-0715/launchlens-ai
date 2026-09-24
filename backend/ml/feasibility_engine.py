import os
import json
import math
import numpy as np
import pandas as pd
import joblib

MODEL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'models'))
MODEL_PATH = os.path.join(MODEL_DIR, 'startup_classifier.joblib')
METADATA_PATH = os.path.join(MODEL_DIR, 'model_metadata.json')
BENCHMARKS_PATH = os.path.join(MODEL_DIR, 'industry_benchmarks.json')

class FeasibilityEngine:
    def __init__(self):
        self.model = None
        self.metadata = {}
        self.benchmarks = {}
        self._load_artifacts()

    def _load_artifacts(self):
        if os.path.exists(MODEL_PATH):
            self.model = joblib.load(MODEL_PATH)
        if os.path.exists(METADATA_PATH):
            with open(METADATA_PATH, 'r', encoding='utf-8') as f:
                self.metadata = json.load(f)
        if os.path.exists(BENCHMARKS_PATH):
            with open(BENCHMARKS_PATH, 'r', encoding='utf-8') as f:
                self.benchmarks = json.load(f)

    def calculate_feasibility(self, data: dict) -> dict:
        """
        data expected keys:
        - startup_name: str
        - industry: str
        - sub_industry: str
        - problem: str
        - solution: str
        - target_audience: str
        - business_model: str (B2B SaaS, Marketplace, B2C Subscription, etc.)
        - planned_funding_usd: float (or int)
        - planned_rounds: int
        - competition_level: str ('Low', 'Medium', 'High')
        - country: str
        - tech_stack: str
        """
        industry = data.get('industry', 'SaaS')
        country = data.get('country', 'United States')
        competition_level = data.get('competition_level', 'Medium')
        funding = float(data.get('planned_funding_usd') or 500000)
        rounds = int(data.get('planned_rounds') or 2)
        business_model = data.get('business_model', 'B2B SaaS')
        problem = data.get('problem', '')
        solution = data.get('solution', '')
        tech_stack = data.get('tech_stack', '')

        # 1. ML Model Inference
        ml_exit_prob = 0.50
        comp_map = {'Low': 1, 'Medium': 2, 'High': 3}
        comp_num = comp_map.get(competition_level, 2)
        log_funding = math.log10(max(funding, 1000.0))

        if self.model and self.metadata:
            features = self.metadata.get('features', [])
            feature_vector = []
            for feat in features:
                if feat == 'comp_num':
                    feature_vector.append(comp_num)
                elif feat == 'rounds':
                    feature_vector.append(rounds)
                elif feat == 'log_funding':
                    feature_vector.append(log_funding)
                elif feat.startswith('ind_'):
                    ind_name = feat[4:].replace('___', ' / ').replace('_', ' ')
                    # Match normalized
                    norm_current = industry.lower().replace('/', ' ').replace('-', ' ').strip()
                    norm_target = ind_name.lower().replace('/', ' ').replace('-', ' ').strip()
                    feature_vector.append(1 if norm_current in norm_target or norm_target in norm_current else 0)
                elif feat.startswith('cnt_'):
                    cnt_name = feat[4:].replace('_', ' ')
                    feature_vector.append(1 if country.lower() == cnt_name.lower() else 0)
                else:
                    feature_vector.append(0)

            X_in = pd.DataFrame([feature_vector], columns=features)
            try:
                probs = self.model.predict_proba(X_in)[0]
                ml_exit_prob = float(probs[1]) # probability of exit/acquisition
            except Exception as e:
                ml_exit_prob = 0.52

        # 2. Industry Benchmark Context
        benchmark = self.benchmarks.get(industry, {
            "exit_success_rate_percent": 48.5,
            "median_funding_usd": 2000000.0,
            "avg_funding_usd": 14000000.0,
            "avg_funding_rounds": 1.9,
            "avg_competitor_density": 10.5
        })

        # 3. Five Feasibility Dimension Scoring (0 to 100 each)
        # Dimension A: Market Opportunity & Timing (25%)
        market_score = 70.0
        if len(problem) > 50: market_score += 8
        if len(solution) > 50: market_score += 7
        if industry in ['AI / Machine Learning', 'HealthTech', 'FinTech', 'Cybersecurity', 'CleanTech', 'SaaS']:
            market_score += 10
        elif industry in ['Media & Entertainment', 'EdTech']:
            market_score += 4
        market_score = min(max(market_score, 45.0), 96.0)

        # Dimension B: Competitive Moat & Advantage (20%)
        competitive_score = 65.0
        if competition_level == 'Low':
            competitive_score += 18
        elif competition_level == 'Medium':
            competitive_score += 8
        else: # High
            competitive_score -= 5
        if 'AI' in tech_stack or 'proprietary' in solution.lower() or 'patent' in solution.lower():
            competitive_score += 10
        if 'api' in tech_stack.lower() or 'cloud' in tech_stack.lower():
            competitive_score += 5
        competitive_score = min(max(competitive_score, 40.0), 95.0)

        # Dimension C: Financial Viability & Unit Economics (20%)
        financial_score = 60.0
        # Check funding reasonableness compared to benchmark
        median_f = benchmark.get('median_funding_usd', 2000000.0)
        ratio = funding / max(median_f, 100000.0)
        if 0.1 <= ratio <= 2.5:
            financial_score += 15 # realistic early stage
        elif ratio < 0.1:
            financial_score += 5 # bootstrap / lean
        else:
            financial_score += 10 # well-capitalized
        if business_model in ['B2B SaaS', 'Subscription (B2B)', 'API / Usage-based']:
            financial_score += 14 # high gross margins (75-85%)
        elif business_model in ['Marketplace', 'Platform']:
            financial_score += 8 # network effects but takes time
        else:
            financial_score += 7
        financial_score = min(max(financial_score, 42.0), 95.0)

        # Dimension D: Execution & Technical Feasibility (20%)
        tech_score = 65.0
        if len(tech_stack) > 15: tech_score += 12
        if any(kw in tech_stack.lower() for kw in ['python', 'react', 'fastapi', 'node', 'aws', 'docker', 'postgresql', 'pytorch']):
            tech_score += 10
        tech_score = min(max(tech_score, 50.0), 94.0)

        # Dimension E: Regulatory & Risk Profile (15%)
        regulatory_score = 75.0
        if industry in ['FinTech', 'HealthTech', 'BioTech']:
            regulatory_score -= 12 # Higher compliance requirements (HIPAA, SEC/RBI, GDPR)
        elif industry in ['Cybersecurity', 'CleanTech']:
            regulatory_score -= 5
        else:
            regulatory_score += 8 # Low regulatory barrier
        regulatory_score = min(max(regulatory_score, 45.0), 95.0)

        # Overall Weighted Feasibility Score
        overall_score = (
            market_score * 0.25 +
            competitive_score * 0.20 +
            financial_score * 0.20 +
            tech_score * 0.20 +
            regulatory_score * 0.15
        )

        # Modulate slightly by ML exit probability (±5 points)
        ml_adjustment = (ml_exit_prob - 0.50) * 10
        final_feasibility = round(min(max(overall_score + ml_adjustment, 35.0), 98.0), 1)

        # Determine Tier
        if final_feasibility >= 80:
            tier = "High Feasibility (Strong Market Validation)"
            badge_color = "emerald"
        elif final_feasibility >= 65:
            tier = "Moderate-High Feasibility (Viable with Refinements)"
            badge_color = "blue"
        elif final_feasibility >= 50:
            tier = "Moderate Risk (Needs Structural Iteration)"
            badge_color = "amber"
        else:
            tier = "High Risk / Speculative (Requires Deep Validation)"
            badge_color = "rose"

        # Key Drivers and Risk Flags
        drivers = []
        risks = []

        if market_score >= 75:
            drivers.append(f"Strong industry tailwinds in {industry} with high market appetite.")
        if competitive_score >= 70:
            drivers.append(f"Favorable competitive dynamics with clear differentiation opportunities.")
        if financial_score >= 75:
            drivers.append(f"Scalable unit economics supported by the {business_model} revenue model.")
        if tech_score >= 75:
            drivers.append("Solid technical architecture feasibility with well-supported modern tech stack.")

        if competition_level == 'High':
            risks.append("Crowded competitive sector; aggressive customer acquisition cost (CAC) risk.")
        if industry in ['FinTech', 'HealthTech']:
            risks.append(f"Regulatory compliance overhead in {industry} can lengthen sales cycles.")
        if funding < 100000:
            risks.append("Capital constraint: planned initial funding is lean compared to median industry milestones.")

        if not drivers:
            drivers.append("Well-articulated problem-solution thesis with identifiable customer pain point.")
        if not risks:
            risks.append("Customer discovery risk: ensure early LOIs (Letters of Intent) are secured before full build.")

        return {
            "overall_feasibility_score": final_feasibility,
            "feasibility_tier": tier,
            "badge_color": badge_color,
            "ml_success_probability": round(ml_exit_prob * 100, 1),
            "ml_accuracy_benchmark": f"{self.metadata.get('metrics', {}).get('accuracy', 0.71)*100:.1f}%",
            "dimensions": {
                "market_opportunity": {
                    "score": round(market_score, 1),
                    "weight": "25%",
                    "analysis": f"Evaluates {industry} market trends, TAM/SAM/SOM expansion potential, and macroeconomic timing."
                },
                "competitive_moat": {
                    "score": round(competitive_score, 1),
                    "weight": "20%",
                    "analysis": f"Addresses {competition_level.lower()} competition level and structural barriers to entry."
                },
                "financial_viability": {
                    "score": round(financial_score, 1),
                    "weight": "20%",
                    "analysis": f"Assesses margin resilience, LTV:CAC feasibility under {business_model}, and funding runway."
                },
                "technical_feasibility": {
                    "score": round(tech_score, 1),
                    "weight": "20%",
                    "analysis": "Analyzes architecture scalability, time-to-MVP, and operational execution risk."
                },
                "regulatory_risk": {
                    "score": round(regulatory_score, 1),
                    "weight": "15%",
                    "analysis": f"Examines compliance barriers, data privacy mandates, and legal exposure in {industry}."
                }
            },
            "industry_benchmarks": {
                "industry": industry,
                "dataset_sample_count": benchmark.get("total_companies", 500),
                "historical_exit_rate": f"{benchmark.get('exit_success_rate_percent', 48.5)}%",
                "median_funding_usd": benchmark.get("median_funding_usd", 2000000.0),
                "avg_rounds_to_exit": benchmark.get("avg_funding_rounds", 1.9),
                "avg_competitor_density": benchmark.get("avg_competitor_density", 11.2)
            },
            "key_growth_drivers": drivers,
            "critical_risk_flags": risks
        }

feasibility_engine = FeasibilityEngine()
