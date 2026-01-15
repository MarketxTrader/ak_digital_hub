from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bakong_khqr import KHQR
import uvicorn
import time
import requests
import os
from dotenv import load_dotenv

# ០. Load Environment Variables
load_dotenv()

app = FastAPI(title="AK Digital Hub API")

# ១. បើក CORS ឱ្យមានលក្ខណៈទូលំទូលាយ
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ២. ការកំណត់ Bakong
BAKONG_TOKEN = os.getenv("BAKONG_TOKEN") 
khqr = KHQR(BAKONG_TOKEN)

# ៣. ព័ត៌មាន Google Script URL
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec"

# ៤. ព័ត៌មាន Admin
ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASS = os.getenv("ADMIN_PASS")

class AdminLoginRequest(BaseModel):
    username: str
    password: str

# --- ROOT PATH ---
@app.get("/")
def read_root():
    return {
        "status": "Online", 
        "message": "AK Digital Hub API is running successfully!",
        "timestamp": time.time()
    }

# --- ផ្នែកសម្រាប់ ADMIN ---

@app.post("/api/admin/login")
async def admin_login(data: AdminLoginRequest):
    if not ADMIN_USER or not ADMIN_PASS:
        raise HTTPException(status_code=500, detail="Server configuration missing!")
        
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
        # បើបង់រួច Bakong នឹងបោះ responseCode "000" ឬ "0"
        if response and response.get('responseCode') in [0, "0", "000"]:
            return {"status": "PAID", "details": response}
        return {"status": "PENDING", "details": response}
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}

@app.post("/api/update-payment")
async def update_payment(payload: dict = Body(...)):
    """ ផ្ញើទិន្នន័យទៅកាន់ Google Sheets បន្ទាប់ពីបង់ប្រាក់រួច """
    try:
        # បន្ថែម action ទៅឱ្យ Google Script ស្គាល់
        payload["action"] = "update_payment_status" 
        response = requests.post(GOOGLE_SCRIPT_URL, json=payload)
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- ដំណើរការ Server សម្រាប់ Render ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)