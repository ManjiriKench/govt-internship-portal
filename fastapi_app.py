import io
import os
import re
import time
import logging
from typing import Dict, List, Tuple

import numpy as np
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import PyPDF2

try:
    import docx  # python-docx
except Exception:
    docx = None

import requests
from bs4 import BeautifulSoup

# --------------------------
# Logging
# --------------------------
logging.basicConfig(level=logging.INFO)
log = logging.getLogger("internship-api")

# --------------------------
# Config / CORS / Env
# --------------------------
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*")
COURSES_MODE = os.getenv("COURSES_MODE", "scrape").lower()  # "scrape" | "stub"
MAX_UPLOAD_MB = float(os.getenv("MAX_UPLOAD_MB", "5"))       # enforce backend size too

if ALLOWED_ORIGINS.strip() == "*":
    allow_origins = ["*"]
else:
    allow_origins = [o.strip() for o in ALLOWED_ORIGINS.split(",") if o.strip()]

app = FastAPI(title="Internship Match API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Model & Data
# --------------------------
# Load once at startup; first request may still warm model cache
log.info("Loading sentence-transformers model: all-MiniLM-L6-v2 ...")
model = SentenceTransformer("all-MiniLM-L6-v2")
log.info("Model loaded.")

internships: Dict[str, Dict[str, int]] = {
    "Data Scientist Intern": {"Python": 3, "Machine Learning": 3, "SQL": 2, "Statistics": 2, "Pandas": 1},
    "Frontend Developer Intern": {"HTML": 2, "CSS": 2, "JavaScript": 3, "React": 3, "UI/UX": 1},
    "Backend Developer Intern": {"Python": 2, "Django": 3, "SQL": 2, "APIs": 2, "Docker": 1},
    "Full Stack Developer Intern": {"HTML": 2, "CSS": 2, "JavaScript": 3, "React": 2, "Node.js": 3, "MongoDB": 2},
    "Cloud Engineer Intern": {"AWS": 3, "Docker": 2, "Linux": 2, "Kubernetes": 2, "CI/CD": 2},
    "DevOps Intern": {"Linux": 2, "Docker": 2, "CI/CD": 3, "Jenkins": 2, "Cloud": 2},
    "AI Research Intern": {"Python": 2, "Deep Learning": 3, "NLP": 3, "PyTorch": 2, "Mathematics": 2},
    "Business Analyst Intern": {"Excel": 2, "SQL": 2, "Data Visualization": 2, "Tableau": 3, "Business Communication": 2},
    "Cybersecurity Intern": {"Networking": 2, "Linux": 2, "Security Tools": 2, "Python": 1, "Penetration Testing": 3},
    "Mobile App Developer Intern": {"Java": 2, "Kotlin": 3, "Android Studio": 3, "Firebase": 2, "UI/UX": 1},
}

# --------------------------
# Helpers
# --------------------------
def _enforce_size_limit(content: bytes):
    byte_limit = int(MAX_UPLOAD_MB * 1024 * 1024)
    if len(content) > byte_limit:
        raise HTTPException(status_code=413, detail=f"File too large. Limit is {MAX_UPLOAD_MB} MB.")

def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    try:
        reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
        texts = []
        for page in reader.pages:
            t = page.extract_text() or ""
            if t:
                texts.append(t)
        return "\n".join(texts).strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"PDF read error: {e}")

def extract_text_from_docx_bytes(docx_bytes: bytes) -> str:
    if docx is None:
        raise HTTPException(status_code=400, detail="DOCX support not installed. Add 'python-docx' to requirements.")
    try:
        d = docx.Document(io.BytesIO(docx_bytes))
        return "\n".join([p.text for p in d.paragraphs if p.text]).strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"DOCX read error: {e}")

def extract_text_from_upload(f: UploadFile) -> str:
    content = f.file.read()
    _enforce_size_limit(content)
    name = (f.filename or "").lower()
    if name.endswith(".pdf"):
        return extract_text_from_pdf_bytes(content)
    if name.endswith(".docx"):
        return extract_text_from_docx_bytes(content)
    raise HTTPException(status_code=415, detail="Unsupported file type. Please upload PDF or DOCX.")

def extract_skills_from_resume(resume_text: str, internship_skills: Dict[str, int]) -> Dict[str, int]:
    resume_text_lower = resume_text.lower()
    extracted: Dict[str, int] = {}

    # union of all known skills across internships + target skills
    all_skills_keywords = set()
    for data in internships.values():
        all_skills_keywords.update(data.keys())
    target_skills = set(internship_skills.keys())
    all_to_check = all_skills_keywords.union(target_skills)

    for skill in all_to_check:
        s = skill.lower()
        count = len(re.findall(r'\b' + re.escape(s) + r'\b', resume_text_lower))
        if count > 0:
            extracted[skill] = min(count, 3)  # cap at 3
    return extracted

def compute_match(student_skills: Dict[str, int], internship_skills: Dict[str, int]) -> Tuple[float, List[Tuple[str, str, float]], List[str]]:
    if not student_skills:
        return 0.0, [], list(internship_skills.keys())

    student_names = list(student_skills.keys())
    # Pre-encode student skills once
    student_embeds = model.encode(student_names, normalize_embeddings=True)
    total_weight = sum(internship_skills.values())
    score_sum = 0.0
    matches: List[Tuple[str, str, float]] = []
    missing: List[str] = []

    for req_skill, weight in internship_skills.items():
        req_vec = model.encode([req_skill], normalize_embeddings=True)
        sims = cosine_similarity(req_vec, student_embeds)[0]
        best_idx = int(np.argmax(sims))
        best_sim = float(sims[best_idx])
        if best_sim > 0.6:
            score_sum += best_sim * weight
            matches.append((req_skill, student_names[best_idx], round(best_sim, 2)))
        else:
            missing.append(req_skill)

    match_pct = (score_sum / total_weight) * 100.0
    return round(float(match_pct), 2), matches, missing

def fetch_course_details(link: str):
    try:
        r = requests.get(link, headers={"User-Agent": "Mozilla/5.0"}, timeout=8)
        soup = BeautifulSoup(r.text, "html.parser")
        duration = "Not Listed"
        dur = soup.find(string=lambda t: isinstance(t, str) and any(w in t.lower() for w in ["weeks", "hours", "months", "days"]))
        if dur and len(dur.strip()) < 100:
            duration = dur.strip()
        rating_node = soup.find("span", {"data-test": "number-star-rating"})
        rating = rating_node.get_text(strip=True) if rating_node else "Not Listed"
        return duration, rating
    except Exception:
        return "Not Listed", "Not Listed"

def recommend_courses_for_missing_skills(missing_skills: List[str]) -> List[dict]:
    if not missing_skills:
        return []
    results: List[dict] = []
    for skill in missing_skills:
        url = f"https://www.coursera.org/search?query={requests.utils.quote(skill)}"
        try:
            r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
            soup = BeautifulSoup(r.text, "html.parser")
            count = 0
            for item in soup.find_all("li", {"class": "cds-9"}):
                if count >= 3:
                    break
                title_tag = item.find("h3") or item.find("span", {"class": "cds-119"})
                link_tag = item.find("a", href=True)
                if title_tag and link_tag:
                    title = title_tag.get_text(strip=True)
                    link = "https://www.coursera.org" + link_tag["href"]
                    duration, rating = fetch_course_details(link)
                    results.append({
                        "skill": skill,
                        "title": title,
                        "duration": duration,
                        "rating": rating,
                        "link": link
                    })
                    count += 1
            time.sleep(0.3)
        except Exception:
            # ignore one-skill failures, continue with others
            continue
    return results

def stub_courses_for_missing_skills(missing_skills: List[str]) -> List[dict]:
    demo = []
    for skill in (missing_skills or [])[:3]:
        demo.append({
            "skill": skill,
            "title": f"Intro to {skill}",
            "duration": "4 weeks (self-paced)",
            "rating": "4.7",
            "link": "https://www.coursera.org"
        })
    return demo

# --------------------------
# Schemas
# --------------------------
class CoursesIn(BaseModel):
    missing_skills: List[str]

# --------------------------
# Basic routes
# --------------------------
@app.get("/")
def root():
    return {
        "ok": True,
        "name": "Internship Match API",
        "version": app.version,
        "docs": "/docs",
        "health": "/health",
        "endpoints": ["/analyze (POST multipart)", "/courses (POST json)"]
    }

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/internships")
def list_internships():
    return {"count": len(internships), "internships": internships}

# --------------------------
# Core endpoints
# --------------------------
@app.post("/analyze")
async def analyze_resume(
    internship: str = Form(...),
    file: UploadFile = File(...)
):
    if internship not in internships:
        raise HTTPException(status_code=400, detail="Unknown internship.")
    internship_skills = internships[internship]

    # read & parse resume
    text = extract_text_from_upload(file)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Empty or unreadable resume.")

    # skills + match
    student_skills = extract_skills_from_resume(text, internship_skills)
    score, matches, missing = compute_match(student_skills, internship_skills)

    return {
        "internship": internship,
        "score": score,
        "matches": [{"required": r, "resume_skill": s, "similarity": sim} for (r, s, sim) in matches],
        "missing": missing,
        "detected_skills": student_skills
    }

@app.post("/courses")
async def courses(body: CoursesIn):
    if COURSES_MODE == "stub":
        return {"courses": stub_courses_for_missing_skills(body.missing_skills)}
    return {"courses": recommend_courses_for_missing_skills(body.missing_skills)}

# --------------------------
# Local dev entry
# --------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fastapi_app:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
