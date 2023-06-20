from sqlalchemy.exc import SQLAlchemyError
from app import app, db
from models.user import UserModel

with app.app_context():
    try:
        print("Creating our database...")
        db.drop_all()
        db.create_all()
        print("Seeding database.")

        test_user = UserModel(
            email="test@test.com", username="test user", password="Password"
        )
        test_user.save()

        print("Database seeded.")

    except SQLAlchemyError as e:
        print(e)
