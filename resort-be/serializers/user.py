import re
from marshmallow import fields, ValidationError
from app import ma
from models.user import UserModel
from serializers.resort import ResortSchema


def validate_password(password):

    if len(password) < 8:
        raise ValidationError("Make sure your password is at least 8 characters.")

    if re.search("[A-Z]", password) is None:
        raise ValidationError("Make sure your password contains a capital letter.")


class UserSchema(ma.SQLAlchemyAutoSchema):

    password = fields.String(required=True, validate=validate_password)

    favorites = fields.Nested(ResortSchema, many=True, exclude=("users",))

    class Meta:
        model = UserModel
        load_instance = True
        exclude = ("password_hash",)
        load_only = ("email", "password")
