from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv
import random

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://db:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# --- API Endpoint เดียวสำหรับทุกโจทย์ ---
@app.get("/examples/{problem_type}")
def get_random_example_by_type(problem_type: str, db: Session = Depends(get_db)):
    """
    ดึงข้อมูลโจทย์แบบสุ่มตามประเภทที่ระบุ (e.g., 'bisection', 'onepoint', 'matrix')
    """
    query = text("SELECT data FROM examples WHERE problem_type = :type")
    results = db.execute(query, {"type": problem_type}).fetchall()
    
    if not results:
        raise HTTPException(status_code=404, detail="Problem type not found")
        
    # สุ่มเลือกหนึ่งรายการจากผลลัพธ์
    random_example = random.choice(results)
    
    return random_example[0] # trả về object `data` โดยตรง