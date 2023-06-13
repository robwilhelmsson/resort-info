import requests
from flask import Blueprint, request
from marshmallow.exceptions import ValidationError

from models.resort import ResortModel
# from models.resort_info import ResortInfoModel
from serializers.resort import ResortSchema
# from serializers.resort_info import ResortInfoSchema


resort_schema = ResortSchema()
# resort_info_schema = ResortInfoSchema()

router = Blueprint("resorts", __name__)

def resort_data(response):
    if response.status_code == 200:
        resorts_data = response.json()
        for data in resorts_data:
            name = data["name"]
            country = data["location"]["country"]
            continent = data["location"]["continent"]
            existing_resort = ResortModel.query.filter_by(name=name).first()
            if existing_resort:
                continue
            resort = ResortModel(name=name, country=country, continent=continent)
            resort.save()
        return "Resort data fetched and saved to the database."
    return "Failed to fetch resort data from the API."


def all_resort_data_list():
    url = "https://ski-resort-api.p.rapidapi.com/resort-list"
    headers = {
        "X-RapidAPI-Key": "5cfa6e43e7mshf5e41a4a4130970p169d2ejsn7198fd4220d6",
        "X-RapidAPI-Host": "ski-resort-api.p.rapidapi.com",
    }
    response = requests.get(url, headers=headers, timeout=50)
    resort_data(response)



# def resort_info_data(response):
#     if response.status_code == 200:
#         resorts_info_data = response.json()
#         for data in resorts_info_data:
#             # name = data["name"]
#             name=data["name"],
#             existing_resort = ResortModel.query.filter_by(name=name).first()
#             if existing_resort:
#                 continue
#             resort = ResortModel(name=name)
#             resort.save()
#         return "Resort data fetched and saved to the database."
#     return "Failed to fetch resort data from the API."

# def resort_information():
#     url = "https://ski-resort-api.p.rapidapi.com/resort/verbier"
#     headers = {
#         "X-RapidAPI-Key": "5cfa6e43e7mshf5e41a4a4130970p169d2ejsn7198fd4220d6",
#         "X-RapidAPI-Host": "ski-resort-api.p.rapidapi.com",
#     }
#     response = requests.get(url, headers=headers, timeout=50)
#     resort_info_data(response)


# #! Get resort information
# @router.route("/resortinfo", methods=["GET"])
# def get_resort_info():
#     resort_information()
#     resorts = ResortInfoModel.query.all()
#     return resort_info_schema.jsonify(resorts, many=True)

#! Get all resorts
@router.route("/resorts", methods=["GET"])
def get_resorts():
    all_resort_data_list()
    resorts = ResortModel.query.all()
    return resort_schema.jsonify(resorts, many=True)

#! Get one resorts by ID
@router.route("/resorts/<int:resort_id>", methods=["GET"])
def get_single_resort_id(resort_id):
    resort = ResortModel.query.get(resort_id)
    return resort_schema.jsonify(resort)

#! Get one resorts by NAME
@router.route("/resorts/<string:resort_name>", methods=["GET"])
def get_single_resort_name(resort_name):
    resort = ResortModel.query.filter_by(name=resort_name).first()
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
