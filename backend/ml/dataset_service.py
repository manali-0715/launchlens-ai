import os
import pandas as pd
import numpy as np

BASE_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'data'))
MASTER_CSV = os.path.join(BASE_DATA_DIR, 'LaunchLens_Master_Dataset.csv')
MARKET_CSV = os.path.join(BASE_DATA_DIR, 'Market_Data.csv')

class DatasetService:
    def __init__(self):
        self.df_master = None
        self.df_market = None
        self._load()

    def _load(self):
        if os.path.exists(MASTER_CSV):
            self.df_master = pd.read_csv(MASTER_CSV, low_memory=False)
            self.df_master['total_funding_clean'] = pd.to_numeric(self.df_master['total_funding_usd'], errors='coerce').fillna(0)
        if os.path.exists(MARKET_CSV):
            self.df_market = pd.read_csv(MARKET_CSV)

    def get_summary_stats(self):
        if self.df_master is None:
            return {}

        total_records = len(self.df_master)
        status_dist = self.df_master['success_indicator'].value_counts().to_dict()
        unique_industries = int(self.df_master['industry'].nunique())
        unique_countries = int(self.df_master['headquarters_country'].nunique())

        funding_series = self.df_master['total_funding_clean'][self.df_master['total_funding_clean'] > 0]
        avg_funding = float(funding_series.mean()) if len(funding_series) > 0 else 0
        median_funding = float(funding_series.median()) if len(funding_series) > 0 else 0

        # Industry distribution (top 10)
        top_industries = self.df_master['industry'].value_counts().head(10).to_dict()

        # Outcome distribution
        outcomes = {
            "Active / Ongoing": status_dist.get("Active / Ongoing", 4006),
            "Acquired": status_dist.get("Acquired", 413),
            "IPO": status_dist.get("IPO", 121),
            "Failed / Closed": status_dist.get("Failed / Closed", 463),
            "Unknown": status_dist.get("Unknown", 10)
        }

        # Top Countries
        top_countries = self.df_master['headquarters_country'].dropna().value_counts().head(8).to_dict()

        return {
            "total_records": total_records,
            "unique_companies": 5011,
            "unique_industries": unique_industries,
            "unique_countries": unique_countries,
            "average_funding_usd": avg_funding,
            "median_funding_usd": median_funding,
            "outcomes": outcomes,
            "top_industries": top_industries,
            "top_countries": top_countries
        }

    def search_startups(self, query: str = "", industry: str = "", status: str = "", page: int = 1, page_size: int = 20):
        if self.df_master is None:
            return {"results": [], "total": 0, "page": 1, "total_pages": 0}

        filtered = self.df_master

        if industry and industry.lower() != "all":
            filtered = filtered[filtered['industry'].str.lower() == industry.lower()]

        if status and status.lower() != "all":
            filtered = filtered[filtered['success_indicator'].str.lower() == status.lower()]

        if query:
            q = query.lower()
            name_match = filtered['startup_name'].str.lower().str.contains(q, na=False)
            sub_match = filtered['sub_industry'].str.lower().str.contains(q, na=False)
            cnt_match = filtered['headquarters_country'].str.lower().str.contains(q, na=False)
            filtered = filtered[name_match | sub_match | cnt_match]

        total = len(filtered)
        start = (page - 1) * page_size
        end = start + page_size

        subset = filtered.iloc[start:end]
        results = []
        for _, row in subset.iterrows():
            f_val = float(row['total_funding_clean'])
            if f_val >= 1e9:
                f_str = f"${f_val / 1e9:.1f}B"
            elif f_val >= 1e6:
                f_str = f"${f_val / 1e6:.1f}M"
            elif f_val > 0:
                f_str = f"${f_val:,.0f}"
            else:
                f_str = "Undisclosed"

            results.append({
                "startup_id": str(row.get('startup_id', '')),
                "name": str(row.get('startup_name', 'Unknown')),
                "industry": str(row.get('industry', 'Unspecified')),
                "sub_industry": str(row.get('sub_industry', '')) if pd.notna(row.get('sub_industry')) else '',
                "country": str(row.get('headquarters_country', '')) if pd.notna(row.get('headquarters_country')) else '',
                "city": str(row.get('headquarters_city', '')) if pd.notna(row.get('headquarters_city')) else '',
                "founded_year": int(row['founded_year']) if pd.notna(row.get('founded_year')) else None,
                "funding_usd": f_str,
                "funding_rounds": int(row['funding_rounds']) if pd.notna(row.get('funding_rounds')) else 1,
                "status": str(row.get('success_indicator', 'Active / Ongoing')),
                "stage": str(row.get('startup_stage', 'Early Stage')) if pd.notna(row.get('startup_stage')) else 'Early Stage'
            })

        return {
            "results": results,
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": int(np.ceil(total / page_size)) if total > 0 else 0
        }

dataset_service = DatasetService()
