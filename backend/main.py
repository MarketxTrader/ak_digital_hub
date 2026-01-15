from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bakong_khqr import KHQR
import uvicorn
import time
import requests
import os
from dotenv import load_dotenv

# ០. Load Environment Variables (សម្រាប់សុវត្ថិភាព)
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

# ២. ការកំណត់ Bakong (ទាញចេញពី Env ឬដាក់ផ្ទាល់)
BAKONG_TOKEN = os.getenv("BAKONG_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYWQ4MTAzNDBhODdlNDkxMSJ9LCJpYXQiOjE3Njc4NjM5OTQsImV4cCI6MTc3NTYzOTk5NH0.jQPyKIu2RkHq1OVbMeU60AxqvQC_qODy6VYIHrCYGd4") 
khqr = KHQR(BAKONG_TOKEN)

# ៣. ព័ត៌មាន Google Script URL
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec"

# ៤. ព័ត៌មាន Admin
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
    if data.username == ADMIN_USER and data.password == ADMIN_PASS:
        return {
            "result": "success",
            "user": {"name": "AK Administrator", "username": "admin", "role": "super_admin"}
        }
    raise HTTPException(status_code=401, detail="Username ឬ Password មិនត្រឹមត្រូវ!")

@app.get("/api/admin/users")
def get_admin_users():
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={"action": "get_all_users"})
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/admin/delete")
def delete_admin_user(payload: dict = Body(...)):
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={
            "action": "delete_user",
            "username": payload.get("username")
        })
        return response.json()
    except Exception as e:
        return {"result": "error", "message": str(e)}

# --- ផ្នែកសម្រាប់សិស្ស & ការបង់ប្រាក់ ---

@app.get("/api/generate-qr")
def generate_qr(amount: float, currency: str = "USD"):
    try:
        qr_data = khqr.create_qr(
            bank_account='noy_vathana@bkrt',
            merchant_name='VATHANA NOY',
            merchant_city='Phnom Penh',
            amount=amount,
            currency=currency,
            store_label='AK_HUB',
            phone_number='85587402145',
            terminal_label='Cashier-01',
            bill_number='TRX' + str(int(time.time())),
            static=False 
        )
        md5_hash = khqr.generate_md5(qr_data)
        return {"qr_string": qr_data, "md5": md5_hash}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/check-status/{md5_hash}")
def check_status(md5_hash: str):
    try:
        response = khqr.check_payment(md5_hash)
        # បំប្លែង responseCode ទៅជា Status "PAID" សម្រាប់ React
        if response and str(response.get('responseCode')) in ["0", "000"]:
            return {"status": "PAID"}
        
        return {"status": "PENDING"}
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}

@app.post("/api/update-payment")
async def update_payment(payload: dict = Body(...)):
    try:
        # ផ្ញើទៅ Google Script ដើម្បីកត់ចំណាំក្នុង Excel
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
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)