from app import db
from models.base import BaseModel
from models.resort import ResortModel  # pylint: disable=unused-import
from models.user import UserModel  # pylint: disable=unused-import


class FavoriteResortModel(db.Model, BaseModel):

    __tablename__ = "favorite_resorts"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    resort_id = db.Column(db.Integer, db.ForeignKey("resorts.id"))

    user = db.relationship(
        "UserModel", backref=db.backref("favorite_resorts", lazy="dynamic")
    )
    resort = db.relationship(
        "ResortModel", backref=db.backref("favorite_users", lazy="dynamic")
    )

    def __init__(self, user_id, resort_id):
        self.user_id = user_id
        self.resort_id = resort_id
