from app import ma
from models.resort import ResortModel


class ResortSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ResortModel
        load_instance = True
