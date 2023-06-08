from app import ma
from models.favorite_resort import FavoriteResortModel


class FavoriteResortSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FavoriteResortModel
        load_instance = True
