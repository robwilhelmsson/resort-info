from app import ma
from models.resort_info import ResortInfoModel


class ResortInfoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ResortInfoModel
        load_instance = True
