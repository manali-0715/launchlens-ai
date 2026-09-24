import os
import pandas as pd
import numpy as np

BASE_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'data'))
COMPETITOR_CSV = os.path.join(BASE_DATA_DIR, 'Competitor_Data.csv')
MASTER_CSV = os.path.join(BASE_DATA_DIR, 'LaunchLens_Master_Dataset.csv')

class CompetitorService:
    def __init__(self):
        self.df = None
        self._load_data()

    def _load_data(self):
        if os.path.exists(COMPETITOR_CSV):
            self.df = pd.read_csv(COMPETITOR_CSV)
        elif os.path.exists(MASTER_CSV):
            self.df = pd.read_csv(MASTER_CSV, low_memory=False)

    def analyze_competitors(self, industry: str, country: str = "United States", startup_name: str = "Your Startup", keywords: str = ""):
        if self.df is None:
            return {"competitors": [], "positioning_matrix": [], "differentiation_strategy": []}

        # Filter by industry
        sub = self.df[self.df['industry'].str.lower() == industry.lower()]
        if len(sub) == 0:
            # Fallback search
            sub = self.df[self.df['industry'].str.contains(industry, case=False, na=False)]
        if len(sub) == 0:
            sub = self.df.head(50)

        # Prioritize companies with funding or operating status
        sub = sub.copy()
        sub['funding_clean'] = pd.to_numeric(sub['funding'], errors='coerce').fillna(0)

        # Select top 6-8 direct & indirect competitors
        top_comps = sub.sort_values(by='funding_clean', ascending=False).head(8)

        competitors_list = []
        positioning_points = []

        # Synthetic/normalized coordinates for 2x2 matrix:
        # X: "Market Focus" (-100 = Hyper-Niche, +100 = Broad Enterprise)
        # Y: "Value Proposition" (-100 = Cost/Simplicity, +100 = High-Tech/Customizable)
        np.random.seed(42)

        for idx, row in top_comps.iterrows():
            name = str(row['company_name'])
            sub_ind = str(row['sub_industry']) if pd.notna(row['sub_industry']) else industry
            status = str(row['company_status']) if pd.notna(row['company_status']) else 'Operating'
            funding_val = float(row['funding_clean'])
            market = str(row['geographic_market']) if pd.notna(row['geographic_market']) else country

            # Format funding string
            if funding_val >= 1e9:
                f_str = f"${funding_val / 1e9:.1f}B"
            elif funding_val >= 1e6:
                f_str = f"${funding_val / 1e6:.1f}M"
            elif funding_val >= 1e3:
                f_str = f"${funding_val / 1e3:.0f}k"
            elif funding_val > 0:
                f_str = f"${funding_val:,.0f}"
            else:
                f_str = "Undisclosed / Bootstrapped"

            x_pos = int(np.random.randint(-70, 85))
            y_pos = int(np.random.randint(-60, 80))

            competitors_list.append({
                "id": str(row.get('competitor_id', f'CMP-{idx}')),
                "name": name,
                "industry": industry,
                "sub_industry": sub_ind,
                "status": status.title(),
                "total_funding": f_str,
                "geographic_market": market,
                "competitive_tier": "Tier-1 Incumbent" if funding_val > 10000000 else "Emerging Competitor",
                "perceived_weakness": "High legacy complexity, slower innovation cycles, and premium enterprise pricing.",
                "perceived_strength": "Brand recognition, established customer base, and balance sheet runway."
            })

            positioning_points.append({
                "name": name,
                "x": x_pos, # -100 to 100
                "y": y_pos, # -100 to 100
                "funding": f_str,
                "type": "competitor"
            })

        # Add User's Startup to Positioning Matrix (positioned in the attractive Sweet Spot)
        positioning_points.append({
            "name": startup_name,
            "x": 35, # Agile vertical focus
            "y": 65, # High innovation & automated AI workflows
            "funding": "Early Stage / Seed",
            "type": "user"
        })

        differentiation_strategy = [
            {
                "pillar": "Speed & Automation",
                "insight": "Incumbents rely heavily on manual human workflows or fragmented legacy tools. Automating end-to-end user journeys provides a 10x workflow velocity advantage."
            },
            {
                "pillar": "Modern User Experience (UX)",
                "insight": "Competitor interfaces are clunky and tailored for traditional operators. A modern, transparent, API-first or consumer-grade UI wins early adopters."
            },
            {
                "pillar": "Transparent Value-Based Pricing",
                "insight": "Competitors hide pricing behind opaque enterprise sales reps. Transparent self-serve tiers eliminate friction and reduce CAC by up to 45%."
            },
            {
                "pillar": "AI-Native Differentiation",
                "insight": "Legacy players treat AI as an add-on or marketing buzzword. Building an AI-native core engine provides proprietary analytical moat that compounds over time."
            }
        ]

        return {
            "total_competitors_identified": len(competitors_list),
            "competitors": competitors_list,
            "positioning_matrix": positioning_points,
            "matrix_axes": {
                "x_axis": "Market Breadth (Niche Specialist → Broad Enterprise)",
                "y_axis": "Innovation Level (Legacy Manual → AI-Native Autonomous)"
            },
            "differentiation_strategy": differentiation_strategy
        }

competitor_service = CompetitorService()
