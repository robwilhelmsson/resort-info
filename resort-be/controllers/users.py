from http import HTTPStatus
from flask import Blueprint, request
from marshmallow.exceptions import ValidationError
from models.user import UserModel
from models.resort import ResortModel
from serializers.user import UserSchema
from serializers.favorite_resort import FavoriteResortSchema

user_schema = UserSchema()
favorite_resort_schema = FavoriteResortSchema()

router = Blueprint("users", __name__)


#! Get all users
@router.route("/users", methods=["GET"])
def get_users():
    users = UserModel.query.all()
    print(users)
    return user_schema.jsonify(users, many=True)


#! Sign up user
@router.route("/signup", methods=["POST"])
def signup():
    user_dictionary = request.json
    try:
        user = user_schema.load(user_dictionary)
        user.save()
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    return user_schema.jsonify(user)


#! Log in user
@router.route("/login", methods=["POST"])
def login():
    user_dictionary = request.json
    user = UserModel.query.filter_by(email=user_dictionary["email"]).first()
    if not user:
        return {
            "message": "Your email or password was incorrect."
        }, HTTPStatus.UNAUTHORIZED
    if not user.validate_password(user_dictionary["password"]):
        return {
            "message": "Your email or password was incorrect."
        }, HTTPStatus.UNAUTHORIZED
    return {"message": "Welcome back!"}


#! Users favorite resorts
@router.route("/users/<int:user_id>/favorites", methods=["GET"])
def get_favorite_resorts(user_id):
    user = UserModel.query.get(user_id)
    if not user:
        return {"message": "User not found"}, HTTPStatus.NOT_FOUND
    favorite_resorts = user.get_favorite_resorts()
    result = favorite_resort_schema.dump(favorite_resorts, many=True)
    if not favorite_resorts:
        return {"message": "No favorite resorts found for user."}
    return {"favorite_resorts": result}


#! Add favorite resort
@router.route("/users/<int:user_id>/favorites", methods=["POST"])
def add_favorite_resort(user_id):
    user = UserModel.query.get(user_id)
    resort_id = request.json.get("resort_id")
    resort = ResortModel.query.get(resort_id)
    if not resort:
        return {"message": "Resort not found"}, HTTPStatus.NOT_FOUND
    if not user:
        return {"message": "User not found"}, HTTPStatus.NOT_FOUND
    user.add_favorite_resort(resort)
    favorite_resorts = user.get_favorite_resorts()
    result = favorite_resort_schema.dump(favorite_resorts, many=True)
    return {"message": "Resort added to favorites", "favorite_resorts": result}


#! Remove favorite resort
@router.route("/users/<int:user_id>/favorites/<int:resort_id>", methods=["DELETE"])
def remove_favorite_resort(user_id, resort_id):
    user = UserModel.query.get(user_id)
    resort = ResortModel.query.get(resort_id)
    if not resort:
        return {"message": "Resort not found"}, HTTPStatus.NOT_FOUND
    if not user:
        return {"message": "User not found"}, HTTPStatus.NOT_FOUND
    user.remove_favorite_resort(resort)
    favorite_resorts = user.get_favorite_resorts()
    result = favorite_resort_schema.dump(favorite_resorts, many=True)
    return {"message": "Resort removed from favorites", "favorite_resorts": result}
