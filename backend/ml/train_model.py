import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, classification_report
import joblib

BASE_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'data'))
MODEL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'models'))
os.makedirs(MODEL_DIR, exist_ok=True)

def train_and_benchmark():
    print("--- 1. Loading Datasets ---")
    ml_file = os.path.join(BASE_DATA_DIR, 'ML_Training_Data.csv')
    master_file = os.path.join(BASE_DATA_DIR, 'LaunchLens_Master_Dataset.csv')
    market_file = os.path.join(BASE_DATA_DIR, 'Market_Data.csv')

    df_ml = pd.read_csv(ml_file)
    df_master = pd.read_csv(master_file, low_memory=False)
    df_market = pd.read_csv(market_file)

    print(f"ML Data records: {len(df_ml)}")
    print(f"Master Data records: {len(df_master)}")

    # 2. Extract Industry Benchmarks across entire master dataset
    print("\n--- 2. Computing Industry & Market Benchmarks ---")
    industry_benchmarks = {}
    for ind, group in df_master.groupby('industry'):
        total = len(group)
        status_counts = group['success_indicator'].value_counts().to_dict()
        ipo_cnt = status_counts.get('IPO', 0)
        acq_cnt = status_counts.get('Acquired', 0)
        closed_cnt = status_counts.get('Failed / Closed', 0)
        active_cnt = status_counts.get('Active / Ongoing', 0)

        # exit rate among terminal/resolved outcomes
        resolved = ipo_cnt + acq_cnt + closed_cnt
        exit_success_rate = round((ipo_cnt + acq_cnt) / resolved * 100, 1) if resolved > 0 else 50.0

        # Funding stats where known
        funding_series = group['total_funding_usd'].dropna()
        median_funding = float(funding_series.median()) if len(funding_series) > 0 else 2000000.0
        avg_funding = float(funding_series.mean()) if len(funding_series) > 0 else 15000000.0

        # Round counts
        rounds_series = group['funding_rounds'].dropna()
        avg_rounds = float(rounds_series.mean()) if len(rounds_series) > 0 else 1.8

        # Competitor count
        comp_series = group['competitor_count'].dropna()
        avg_competitors = float(comp_series.mean()) if len(comp_series) > 0 else 12.0

        top_countries = group['headquarters_country'].dropna().value_counts().head(5).to_dict()

        industry_benchmarks[ind] = {
            "total_companies": total,
            "ipo_count": ipo_cnt,
            "acquired_count": acq_cnt,
            "closed_count": closed_cnt,
            "active_count": active_cnt,
            "exit_success_rate_percent": exit_success_rate,
            "median_funding_usd": median_funding,
            "avg_funding_usd": avg_funding,
            "avg_funding_rounds": round(avg_rounds, 1),
            "avg_competitor_density": round(avg_competitors, 1),
            "top_geographies": top_countries
        }

    benchmarks_path = os.path.join(MODEL_DIR, 'industry_benchmarks.json')
    with open(benchmarks_path, 'w', encoding='utf-8') as f:
        json.dump(industry_benchmarks, f, indent=2)
    print(f"Saved industry benchmarks for {len(industry_benchmarks)} industries to {benchmarks_path}")

    # 3. Train ML Classifier on Labeled Ground-Truth Outcomes
    print("\n--- 3. Preparing ML Feature Matrix ---")
    labeled_df = df_ml.dropna(subset=['success_label']).copy()
    labeled_df['success_label'] = labeled_df['success_label'].astype(int)

    # Feature engineering
    # Map competition level to numeric
    comp_map = {'Low': 1, 'Medium': 2, 'High': 3, 'High (dataset-derived)': 3, 'Medium (dataset-derived)': 2, 'Low (dataset-derived)': 1}
    labeled_df['comp_num'] = labeled_df['competition_level'].map(comp_map).fillna(2)

    # Historical rounds
    labeled_df['rounds'] = labeled_df['funding_rounds__HISTORICAL_NOT_FOR_POINT_IN_TIME_PREDICTION'].fillna(1.0)

    # Funding amount (log scale)
    funding_col = 'total_funding_usd__HISTORICAL_NOT_FOR_POINT_IN_TIME_PREDICTION'
    labeled_df['funding'] = labeled_df[funding_col].fillna(labeled_df[funding_col].median()).clip(lower=1000)
    labeled_df['log_funding'] = np.log10(labeled_df['funding'])

    # Top industries encoding
    top_industries = list(df_master['industry'].value_counts().head(15).index)
    for ind in top_industries:
        clean_name = 'ind_' + ind.replace(' ', '_').replace('/', '_').replace('-', '_')
        labeled_df[clean_name] = (labeled_df['industry'] == ind).astype(int)

    # Top countries encoding
    top_countries = ['United States', 'United Kingdom', 'Canada', 'India', 'Germany', 'France', 'Israel']
    for cnt in top_countries:
        labeled_df['cnt_' + cnt.replace(' ', '_')] = (labeled_df['founded_country'] == cnt).astype(int)

    feature_cols = ['comp_num', 'rounds', 'log_funding'] + \
                   ['ind_' + ind.replace(' ', '_').replace('/', '_').replace('-', '_') for ind in top_industries] + \
                   ['cnt_' + cnt.replace(' ', '_') for cnt in top_countries]

    X = labeled_df[feature_cols]
    y = labeled_df['success_label']

    print(f"Training dataset: {len(X)} samples, {len(feature_cols)} features")
    print(f"Class distribution: 1 (Acquired/IPO): {(y == 1).sum()} ({round((y == 1).mean()*100, 1)}%), 0 (Closed): {(y == 0).sum()} ({round((y == 0).mean()*100, 1)}%)")

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    # Random Forest Model
    rf_model = RandomForestClassifier(
        n_estimators=250,
        max_depth=8,
        min_samples_split=4,
        min_samples_leaf=2,
        random_state=42
    )
    rf_model.fit(X_train, y_train)

    y_pred = rf_model.predict(X_test)
    y_prob = rf_model.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc = roc_auc_score(y_test, y_prob)

    print("\n--- 4. Model Evaluation on Test Set ---")
    print(f"Accuracy:  {acc:.4f} ({acc*100:.2f}%)")
    print(f"Precision: {prec:.4f}")
    print(f"Recall:    {rec:.4f}")
    print(f"F1 Score:  {f1:.4f}")
    print(f"ROC-AUC:   {roc:.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=['Closed (0)', 'Acquired/IPO (1)']))

    # Feature importances
    importances = dict(zip(feature_cols, [round(float(imp), 4) for imp in rf_model.feature_importances_]))
    sorted_importances = dict(sorted(importances.items(), key=lambda item: item[1], reverse=True))

    metadata = {
        "model_type": "RandomForestClassifier",
        "n_estimators": 250,
        "features": feature_cols,
        "top_industries": top_industries,
        "top_countries": top_countries,
        "metrics": {
            "accuracy": round(float(acc), 4),
            "precision": round(float(prec), 4),
            "recall": round(float(rec), 4),
            "f1_score": round(float(f1), 4),
            "roc_auc": round(float(roc), 4)
        },
        "feature_importances": sorted_importances,
        "dataset_sample_size": len(X),
        "source_repository": "Crunchbase Verified Stratified Pool (5,013 / 67,021 companies)"
    }

    # Save model and metadata
    model_save_path = os.path.join(MODEL_DIR, 'startup_classifier.joblib')
    metadata_save_path = os.path.join(MODEL_DIR, 'model_metadata.json')

    joblib.dump(rf_model, model_save_path)
    with open(metadata_save_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)

    print(f"Saved trained Random Forest model to: {model_save_path}")
    print(f"Saved model metadata & feature importances to: {metadata_save_path}")

if __name__ == '__main__':
    train_and_benchmark()
