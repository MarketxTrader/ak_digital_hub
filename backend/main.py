from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import requests
import os
import time
from dotenv import load_dotenv

# ០. Load Environment Variables
load_dotenv()

app = FastAPI(title="AK Digital Hub API")

# ១. បើក CORS ឱ្យមានលក្ខណៈទូលំទូលាយសម្រាប់ React App
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ២. ព័ត៌មាន Google Script URL (សម្រាប់ភ្ជាប់ទៅ Google Sheet)
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec"

# ៣. ព័ត៌មាន Admin សម្រាប់ Login ចូល Dashboard
ADMIN_USER = os.getenv("ADMIN_USER", "ak_admin_2024")
ADMIN_PASS = os.getenv("ADMIN_PASS", "AK@Master7799")

class AdminLoginRequest(BaseModel):
    username: str
    password: str

# --- ROOT PATH ---
@app.get("/")
def read_root():
    return {"status": "Online", "message": "AK Digital Hub API is running successfully!"}

# --- ផ្នែកសម្រាប់ ADMIN ---

@app.post("/api/admin/login")
async def admin_login(data: AdminLoginRequest):
    """ ផ្ទៀងផ្ទាត់ការចូលប្រើប្រាស់របស់ Admin """
    if data.username == ADMIN_USER and data.password == ADMIN_PASS:
        return {
            "result": "success",
            "user": {"name": "AK Administrator", "username": "admin", "role": "super_admin"}
        }
    raise HTTPException(status_code=401, detail="Username ឬ Password មិនត្រឹមត្រូវ!")

@app.get("/api/admin/users")
def get_admin_users():
    """ ទាញយកបញ្ជីឈ្មោះសិស្សទាំងអស់ពី Google Sheet មកបង្ហាញក្នុង Dashboard """
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={"action": "get_all_users"})
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/admin/approve-student")
async def approve_student(payload: dict = Body(...)):
    """ មុខងារសំខាន់៖ ទទួលការ Approve ពី Admin ដើម្បីបើកសិទ្ធិឱ្យសិស្សចូលរៀន """
    username = payload.get("username")
    course_name = payload.get("course_name")
    
    try:
        # ផ្ញើទិន្នន័យទៅ Google Apps Script ដើម្បី Update ក្នុង Sheet ឱ្យទៅជា 'Paid'
        response = requests.post(GOOGLE_SCRIPT_URL, json={
            "action": "approve_payment",
            "username": username,
            "enrolled_course": course_name,
            "payment_status": "Paid"
        })
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error approving student: {str(e)}")

@app.post("/api/admin/delete")
def delete_admin_user(payload: dict = Body(...)):
    """ លុបឈ្មោះសិស្សចេញពីប្រព័ន្ធ """
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={
            "action": "delete_user",
            "username": payload.get("username")
        })
        return response.json()
    except Exception as e:
        return {"result": "error", "message": str(e)}

# --- ផ្នែកសម្រាប់សិស្ស ---

@app.post("/api/update-payment")
async def update_payment(payload: dict = Body(...)):
    """ Update ស្ថានភាពបង់ប្រាក់ (ករណីប្រើក្នុង App សិស្ស) """
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={
            "action": "login", 
            "username": payload.get("username"),
            "payment_status": "Paid",
            "enrolled_course": payload.get("course_name")
        })
        return response.json()
    except Exception as e:
        return {"result": "error", "message": str(e)}

# --- ដំណើរការ Server ---
if __name__ == "__main__":
    # Render នឹងផ្តល់ Port ឱ្យដោយស្វ័យប្រវត្តិ
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)