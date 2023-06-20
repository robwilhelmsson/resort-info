from sqlalchemy.exc import SQLAlchemyError
from app import app, db
from models.user import UserModel
from controllers.resorts import all_resort_data_list

with app.app_context():
    try:
        print("Creating our database...")
        db.drop_all()
        db.create_all()
        print("Seeding database.")

        test_user = UserModel(
            email="test@test.com", username="test_user", password="Password"
        )
        test_user.save()

        all_resort_data_list()

        print("Database seeded.")

    except SQLAlchemyError as e:
        print(e)
