from app import db
from models.base import BaseModel


class ResortModel(db.Model, BaseModel):
    __tablename__ = "resorts"

    name = db.Column(db.Text, nullable=False, unique=True)
    country = db.Column(db.Text, nullable=False)
    continent = db.Column(db.Text, nullable=False)
