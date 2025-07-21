from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import pandas as pd
from dotenv import api
# Set your Gemini API Key
genai.configure(api_key=os.getenv('apikey'))
# genai.configure(api_key="YOUR_GEMINI_API_KEY")

# Choose the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

# Define input schema
class FarmerInput(BaseModel):
    Crop: str
    State: str
    Reasons: str
    Remedies: str

@app.post("/recommend_training/")
def recommend_training_api(data: FarmerInput):
    prompt = f"""
You are an agriculture expert. Based on the following production problems and their reasons, suggest a personalized list of specific training modules or sessions for this farmer. Avoid general advice. Make the list actionable and focused.

Crop: {data.Crop}
State: {data.State}
Reasons: {data.Reasons}
Remedies: {data.Remedies}

List the 2-3 most relevant training topics, each with a short description.

Reply in plain language.
"""
    response = model.generate_content(prompt)
    return {"recommendation": response.text.strip()}

# (Optional) Batch endpoint: To process a CSV and add recommendations column
@app.post("/batch_recommend_training/")
def batch_recommend(file_path: str):
    df = pd.read_csv(file_path)
    recommendations = []
    for idx, row in df.iterrows():
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
        recommendations.append(response.text.strip())
    df["Training_Recommendations"] = recommendations
    output_file = "anomaly_report_with_training_gemini.csv"
    df.to_csv(output_file, index=False)
    return {"status": "done", "output": output_file}

