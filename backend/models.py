from sqlalchemy import Column, Integer, String, Float
from database import Base

class Example(Base):
    __tablename__ = "examples"
    id = Column(Integer, primary_key=True, index=True)
    xl = Column(Float, nullable=False)
    xr = Column(Float, nullable=False)
    fx = Column(String, nullable=False)
    et = Column(Float, nullable=False)
