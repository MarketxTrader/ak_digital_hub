from fastapi import FastAPI, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bakong_khqr import KHQR
import uvicorn
import time
import requests

app = FastAPI()

# ១. បើក CORS ដើម្បីឱ្យ React (Vite) អាចហៅ API បាន
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # ក្នុងដំណាក់កាលអភិវឌ្ឍន៍ប្រើ "*" ប៉ុន្តែពេល Public គួរដាក់ URL របស់ Web អ្នក
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ២. ការកំណត់ Bakong (Token និង Instance)
BAKONG_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYWQ4MTAzNDBhODdlNDkxMSJ9LCJpYXQiOjE3Njc4NjM5OTQsImV4cCI6MTc3NTYzOTk5NH0.jQPyKIu2RkHq1OVbMeU60AxqvQC_qODy6VYIHrCYGd4" 
khqr = KHQR(BAKONG_TOKEN)

# ៣. ព័ត៌មាន Google Script URL
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec"

# ៤. ព័ត៌មាន Admin សម្ងាត់ (សម្រាប់ Login)
ADMIN_USER = "ak_admin_2024"
ADMIN_PASS = "AK@Master7799"

# Model សម្រាប់ទទួលទិន្នន័យ Login
class AdminLoginRequest(BaseModel):
    username: str
    password: str

# --- ផ្នែកសម្រាប់ ADMIN (Admin Endpoints) ---

@app.post("/api/admin/login")
async def admin_login(data: AdminLoginRequest):
    """ ផ្ទៀងផ្ទាត់ការចូលប្រើប្រាស់របស់ Admin (Secure Login) """
    if data.username == ADMIN_USER and data.password == ADMIN_PASS:
        return {
            "result": "success",
            "user": {
                "name": "AK Administrator",
                "username": "admin",
                "role": "super_admin"
            }
        }
    else:
        # បដិសេធប្រសិនបើ Password ខុស
        raise HTTPException(status_code=401, detail="Username ឬ Password មិនត្រឹមត្រូវទេ!")

@app.get("/admin/users")
def get_admin_users():
    """ ទាញយកបញ្ជីឈ្មោះសិស្សទាំងអស់ពី Google Sheet មកបង្ហាញក្នុង Admin Dashboard """
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={"action": "get_all_users"})
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cannot fetch users: {str(e)}")

@app.post("/admin/delete")
def delete_admin_user(payload: dict = Body(...)):
    """ លុបឈ្មោះសិស្សពី Google Sheet តាមរយៈ Username """
    username = payload.get("username")
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={
            "action": "delete_user",
            "username": username
        })
        return response.json()
    except Exception as e:
        return {"result": "error", "message": str(e)}

# --- ផ្នែកសម្រាប់សិស្ស (Student Endpoints) ---

@app.get("/generate-qr")
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

@app.get("/check-status/{md5_hash}")
def check_status(md5_hash: str):
    try:
        status = khqr.check_payment(md5_hash)
        return {"status": status}
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}

@app.post("/update-payment")
async def update_payment(payload: dict = Body(...)):
    """ ហៅទៅ Google Script ដើម្បី Update ស្ថានភាពបង់ប្រាក់ក្នុង Sheet """
    username = payload.get("username")
    course_name = payload.get("course_name")
    
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={
            "action": "login", 
            "username": username,
            "payment_status": "Paid",
            "enrolled_course": course_name
        })
        return response.json()
    except Exception as e:
        return {"result": "error", "message": str(e)}
    
@app.post("/admin/approve-payment")
async def approve_payment(payload: dict = Body(...)):
    username = payload.get("username")
    try:
        # ហៅទៅកាន់ Google Apps Script
        response = requests.post(GOOGLE_SCRIPT_URL, json={
            "action": "approve_payment",
            "username": username
        })
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- ដំណើរការ Server ---
if __name__ == "__main__":
    print("🚀 AK Digital Hub Backend is running on http://127.0.0.1:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)