import pandas as pd
import google.generativeai as genai

# 1. Set your Gemini API Key

genai.configure('api')

# 2. Load your CSV
#df = pd.read_csv("anomaly_report_with_reasons.csv")
df = pd.read_csv("rr.csv")

# 3. Create a Gemini model instance
model = genai.GenerativeModel("gemini-1.5-flash")  # or "gemini-1.5-pro" if you want

def recommend_training(row):
    prompt = f"""
You are an agriculture expert. Based on the following production problems and their reasons, suggest a personalized list of specific training modules or sessions for this farmer. Avoid general advice. Make the list actionable and focused.

Crop: {row['Crop']}
State: {row['State']}
Reasons: {row['Reasons']}
Remedies: {row['Remedies']}

List the 2-3 most relevant training topics, each with a short description.

Reply in plain language.
"""
    response = model.generate_content(prompt)
    return response.text.strip()

# 4. Generate recommendations for all entries
recommendations = []
for idx, row in df.iterrows():
    print(f"Generating for row {idx+1}/{len(df)}...")
    rec = recommend_training(row)
    recommendations.append(rec)

df['Training_Recommendations'] = recommendations

# 5. Save or view the new CSV
df.to_csv("anomaly_report_with_training_gemini.csv", index=False)
print("Recommendations added! Saved as anomaly_report_with_training_gemini.csv")
print(df[['Crop', 'State', 'Reasons', 'Training_Recommendations']].head(10))
