from flask import Blueprint, request
from marshmallow.exceptions import ValidationError

from models.resort import ResortModel
from serializers.resort import ResortSchema


resort_schema = ResortSchema()

router = Blueprint("resorts", __name__)


#! Get all resorts
@router.route("/resorts", methods=["GET"])
def get_resorts():
    resorts = ResortModel.query.all()
    print(resorts)
    return resort_schema.jsonify(resorts, many=True)


#! Get one resorts
@router.route("/resorts/<int:resort_id>", methods=["GET"])
def get_single_resort(resort_id):
    resort = ResortModel.query.get(resort_id)
    return resort_schema.jsonify(resort)


#! Add resort
@router.route("/resorts", methods=["POST"])
def create_resort():
    resort_dictionary = request.json
    try:
        resort = resort_schema.load(resort_dictionary)
        resort.save()
    except ValidationError as e:
        return {"errors": e.messages, "message": "Something went wrong"}
    return resort_schema.jsonify(resort)
