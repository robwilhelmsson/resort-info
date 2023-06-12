from datetime import datetime, timedelta
from sqlalchemy.ext.hybrid import hybrid_property
import jwt
from app import db, bcrypt
from models.base import BaseModel
from config.environment import secret


class UserModel(db.Model, BaseModel):

    __tablename__ = "users"

    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password_hash = db.Column(db.Text, nullable=True)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode("utf-8")

    def validate_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)

    def generate_token(self):
        payload = {
            "exp": datetime.utcnow() + timedelta(days=1),
            "iat": datetime.utcnow(),
            "sub": self.id
        }
        token = jwt.encode(
            payload,
            secret,
            algorithm="HS256"
        )

        return token

    def add_favorite_resort(self, resort):
        # pylint: disable=import-outside-toplevel
        from models.favorite_resort import FavoriteResortModel

        favorite_resort = FavoriteResortModel(user_id=self.id, resort_id=resort.id)
        favorite_resort.save()

    def remove_favorite_resort(self, resort):
        # pylint: disable=import-outside-toplevel
        from models.favorite_resort import FavoriteResortModel

        favorite_resort = FavoriteResortModel.query.filter_by(
            user_id=self.id, resort_id=resort.id
        ).first()
        if favorite_resort:
            favorite_resort.remove()

    def get_favorite_resorts(self):
        return [favorite_resort.resort for favorite_resort in self.favorite_resorts]
