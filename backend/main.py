from fastapi import FastAPI, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bakong_khqr import KHQR
import uvicorn
import time
import requests
import os
from dotenv import load_dotenv

# ០. Load Environment Variables (សម្រាប់សុវត្ថិភាពខ្ពស់)
load_dotenv()

app = FastAPI(title="AK Digital Hub API")

# ១. បើក CORS ឱ្យមានលក្ខណៈទូលំទូលាយ
# នេះអនុញ្ញាតឱ្យ React App របស់អ្នកដែលនៅ Vercel អាចទាញទិន្នន័យពី Render បាន
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ២. ការកំណត់ Bakong (ទាញចេញពី Environment Variables ដែលអ្នកបានបញ្ចូលក្នុង Render)
# ប្រសិនបើរកមិនឃើញក្នុង Env វានឹងប្រើតម្លៃ Default (តែគួរប្រើ Env ជាដាច់ខាត)
BAKONG_TOKEN = os.getenv("BAKONG_TOKEN") 
khqr = KHQR(BAKONG_TOKEN)

# ៣. ព័ត៌មាន Google Script URL
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec"

# ៤. ព័ត៌មាន Admin សម្រាប់ Login
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

# --- ផ្នែកសម្រាប់ ADMIN (Admin Endpoints) ---

@app.post("/api/admin/login")
async def admin_login(data: AdminLoginRequest):
    """ ផ្ទៀងផ្ទាត់ការចូលប្រើប្រាស់របស់ Admin """
    if not ADMIN_USER or not ADMIN_PASS:
        raise HTTPException(status_code=500, detail="Server configuration missing!")
        
    if data.username == ADMIN_USER and data.password == ADMIN_PASS:
        return {
            "result": "success",
            "user": {
                "name": "AK Administrator",
                "username": "admin",
                "role": "super_admin"
            }
        }
    raise HTTPException(status_code=401, detail="Username ឬ Password មិនត្រឹមត្រូវទេ!")

@app.get("/api/admin/users")
def get_admin_users():
    """ ទាញយកបញ្ជីឈ្មោះសិស្សទាំងអស់ពី Google Sheet """
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json={"action": "get_all_users"})
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cannot fetch users: {str(e)}")

# --- ផ្នែកសម្រាប់សិស្ស & ការបង់ប្រាក់ (Student Endpoints) ---

@app.get("/api/generate-qr")
def generate_qr(amount: float, currency: str = "USD"):
    """ បង្កើត QR Code សម្រាប់បង់ប្រាក់តាម Bakong KHQR """
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
    """ ពិនិត្យស្ថានភាពបង់ប្រាក់តាមរយៈ MD5 Hash """
    try:
        status = khqr.check_payment(md5_hash)
        return {"status": status}
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}

# --- ដំណើរការ Server សម្រាប់ Render ---
if __name__ == "__main__":
    # Render នឹងបញ្ជូន Port មកឱ្យតាមរយៈ environment variable 'PORT'
    port = int(os.environ.get("PORT", 8000))
    # ប្រើ host 0.0.0.0 ដើម្បីឱ្យ Server ខាងក្រៅអាចចូលមើលបាន
    uvicorn.run(app, host="0.0.0.0", port=port)