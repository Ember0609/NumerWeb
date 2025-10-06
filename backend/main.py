from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
import random
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS สำหรับ React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# สร้าง table (ถ้ายังไม่มี)
Base.metadata.create_all(bind=engine)

# Dependency สำหรับ DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET ตัวอย่างสุ่ม
@app.get("/examples")
def get_examples(db: Session = Depends(get_db)):
    try:
        all_examples = db.query(models.Example).all()
        if not all_examples:
            return None
        example = random.choice(all_examples)
        return {
            "id": example.id,
            "xl": example.xl,
            "xr": example.xr,
            "fx": example.fx,
            "et": example.et
        }
    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}
