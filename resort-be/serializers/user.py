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

# def validate_unique_username(username):
#     existing_user = UserModel.query.filter_by(username=username).first()
#     if existing_user:
#         raise ValidationError("Username already exists.")

# def validate_unique_email(email):
#     existing_user = UserModel.query.filter_by(email=email).first()
#     if existing_user:
#         raise ValidationError("Email already exists.")

class UserSchema(ma.SQLAlchemyAutoSchema):

    # username = fields.String(validate=validate_unique_username)
    # email = fields.Email(validate=validate_unique_email)
    password = fields.String(required=True, validate=validate_password)
    favorites = fields.Nested(ResortSchema, many=True, exclude=("users",))

    class Meta:
        model = UserModel
        load_instance = True
        exclude = ("password_hash",)
        load_only = ("email", "password")
