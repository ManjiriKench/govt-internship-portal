// src/services/api.js
// Centralized API client for your FastAPI backend

const DEFAULT_PROD =
    import.meta.env.VITE_API_BASE ||
    "https://web-production-be12.up.railway.app/"; // replace once or set env var

const API_BASE =
    (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        ? "http://127.0.0.1:8000" // local FastAPI during dev
        : DEFAULT_PROD;           // production (Railway)

export async function analyzeResume(file, internship) {
    const form = new FormData();
    form.append("internship", internship);
    form.append("file", file);

    const res = await fetch(`${API_BASE}/analyze`, { method: "POST", body: form });
    if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try { msg = (await res.json()).detail || msg; } catch { /* empty */ }
        throw new Error(msg);
    }
    return res.json();
}

export async function getCourses(missingSkills) {
    const res = await fetch(`${API_BASE}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missing_skills: missingSkills }),
    });
    if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try { msg = (await res.json()).detail || msg; } catch { /* empty */ }
        throw new Error(msg);
    }
    return res.json();
}
