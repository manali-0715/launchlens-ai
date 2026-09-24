import os
import pandas as pd
import json

BASE_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'data'))

def inspect():
    ml_path = os.path.join(BASE_DATA_DIR, 'ML_Training_Data.csv')
    df = pd.read_csv(ml_path)
    print("Shape of ML_Training_Data:", df.shape)
    print("\nOutcome distribution in ML_Training_Data (success_label):")
    print(df['success_label'].value_counts(dropna=False))
    print("\nSuccess indicator:")
    print(df['success_indicator'].value_counts(dropna=False))
    print("\nTop 10 Industries:")
    print(df['industry'].value_counts().head(10))

    master_path = os.path.join(BASE_DATA_DIR, 'LaunchLens_Master_Dataset.csv')
    master_df = pd.read_csv(master_path, low_memory=False)
    print("\nMaster dataset shape:", master_df.shape)

    comp_path = os.path.join(BASE_DATA_DIR, 'Competitor_Data.csv')
    competitors = pd.read_csv(comp_path)
    print("Competitors count:", len(competitors))

    market_path = os.path.join(BASE_DATA_DIR, 'Market_Data.csv')
    markets = pd.read_csv(market_path)
    print("Market records count:", len(markets))

if __name__ == '__main__':
    inspect()
