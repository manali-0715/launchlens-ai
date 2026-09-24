import os
import sys

# Ensure ml module is on sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'ml'))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from feasibility_engine import feasibility_engine
from competitor_service import competitor_service
from validation_service import validation_service
from business_plan_service import business_plan_service
from chat_service import chat_service
from dataset_service import dataset_service

app = FastAPI(
    title="LaunchLens AI API",
    description="AI-Powered Startup Idea Validation & Business Planning Platform",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaInput(BaseModel):
    startup_name: str
    industry: str
    sub_industry: Optional[str] = ""
    problem: str
    solution: str
    target_audience: Optional[str] = "Founders & Modern Businesses"
    business_model: Optional[str] = "B2B SaaS"
    planned_funding_usd: Optional[float] = 500000.0
    planned_rounds: Optional[int] = 2
    competition_level: Optional[str] = "Medium"
    country: Optional[str] = "United States"
    tech_stack: Optional[str] = "React, Python, FastAPI, PostgreSQL"

class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = {}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "LaunchLens AI Backend", "version": "1.0.0"}

@app.get("/api/metadata")
def get_metadata():
    return {
        "project": "LaunchLens AI",
        "tagline": "AI-Powered Startup Idea Validation & Business Planning Platform",
        "institution": "Department of Information Technology",
        "academic_year": "2026-2027",
        "ml_metadata": feasibility_engine.metadata
    }

@app.post("/api/validate")
def validate_startup_idea(idea: IdeaInput):
    idea_dict = idea.model_dump()

    # 1. Calculate Feasibility Score & ML Predictions
    feasibility = feasibility_engine.calculate_feasibility(idea_dict)

    # 2. Competitor Analysis from real dataset
    competitors = competitor_service.analyze_competitors(
        industry=idea.industry,
        country=idea.country,
        startup_name=idea.startup_name
    )

    # 3. SWOT, ICP, Pricing, and Risk Matrix
    validation_insights = validation_service.generate_validation_insights(idea_dict)

    # 4. Generate Initial Business Plan
    business_plan = business_plan_service.generate_business_plan(
        data=idea_dict,
        feasibility=feasibility,
        competitor_data=competitors,
        validation_data=validation_insights
    )

    return {
        "startup_name": idea.startup_name,
        "industry": idea.industry,
        "country": idea.country,
        "feasibility": feasibility,
        "competitor_intelligence": competitors,
        "validation_insights": validation_insights,
        "business_plan": business_plan
    }

@app.post("/api/chat")
def handle_chat(chat_req: ChatRequest):
    result = chat_service.generate_chat_response(chat_req.message, chat_req.context)
    return result

@app.get("/api/dataset/stats")
def get_dataset_stats():
    return dataset_service.get_summary_stats()

@app.get("/api/dataset/search")
def search_dataset(query: str = "", industry: str = "", status: str = "", page: int = 1, page_size: int = 20):
    return dataset_service.search_startups(query, industry, status, page, page_size)

@app.get("/api/sample-ideas")
def get_sample_ideas():
    return [
        {
            "startup_name": "AgroPulse AI",
            "industry": "CleanTech",
            "sub_industry": "AgTech & Precision Farming",
            "problem": "Smallholder farmers lose 30-40% of crop yield due to unpredicted soil nitrogen depletion and climate micro-shifts.",
            "solution": "IoT hyper-spectral sensors combined with edge ML computer vision that gives daily localized irrigation and fertilization guidance.",
            "target_audience": "Commercial farms, agricultural co-operatives, and agronomy consultants",
            "business_model": "B2B SaaS",
            "planned_funding_usd": 750000,
            "planned_rounds": 2,
            "competition_level": "Medium",
            "country": "India",
            "tech_stack": "Python, TensorFlow Lite, Fastify, React Native, MQTT"
        },
        {
            "startup_name": "MediSync Autonomous",
            "industry": "HealthTech",
            "sub_industry": "Healthcare AI & Clinical Workflows",
            "problem": "Physicians and clinic staff spend 4.5 hours daily on repetitive EHR documentation, causing clinical burnout and billing delays.",
            "solution": "Ambient clinical intelligence that listens to patient consultations and drafts compliant SOAP notes, medical coding, and prior authorization in real time.",
            "target_audience": "Private clinic practices, ambulatory surgery centers, and hospital networks",
            "business_model": "B2B SaaS",
            "planned_funding_usd": 1200000,
            "planned_rounds": 2,
            "competition_level": "High",
            "country": "United States",
            "tech_stack": "Whisper API, FastAPI, PyTorch, React, HIPAA-compliant AWS"
        },
        {
            "startup_name": "FinVantage Ledger",
            "industry": "FinTech",
            "sub_industry": "Cross-Border Payments & Treasury",
            "problem": "Mid-market exporters incur 3-5% FX markups and 4-day settlement lags when wiring supplier payments globally.",
            "solution": "Automated liquidity multi-routing protocol that settles cross-border invoice payments in under 60 seconds at near-interbank rates.",
            "target_audience": "Import-export firms, digital native merchants, and e-commerce aggregators",
            "business_model": "API / Usage-based",
            "planned_funding_usd": 2000000,
            "planned_rounds": 3,
            "competition_level": "High",
            "country": "United Kingdom",
            "tech_stack": "Go, Python, Apache Kafka, React, PostgreSQL"
        },
        {
            "startup_name": "SkillOrbit VR",
            "industry": "EdTech",
            "sub_industry": "Vocational Training & Simulation",
            "problem": "Technical engineering institutes lack affordable access to high-voltage equipment and robotics machinery for hands-on student lab training.",
            "solution": "Immersive physics-accurate digital twin simulations allowing students to execute industrial lab exercises safely via standard web browsers and VR headsets.",
            "target_audience": "Polytechnic institutes, STEM universities, and industrial corporate academies",
            "business_model": "Subscription (B2B)",
            "planned_funding_usd": 400000,
            "planned_rounds": 1,
            "competition_level": "Low",
            "country": "India",
            "tech_stack": "Three.js, WebGL, Unity WebXR, Node.js, WebSockets"
        }
    ]

# Serve frontend build if dist folder exists
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'client', 'dist'))
if os.path.exists(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, 'assets')
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Don't intercept API routes
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Not Found")
        file_path = os.path.join(DIST_DIR, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

