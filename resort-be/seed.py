from sqlalchemy.exc import SQLAlchemyError
from app import app, db
# from models.resort import ResortModel
from models.user import UserModel
# from models.favorite_resort import FavoriteResortModel

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

        # verbier = ResortModel(name="Verbier")
        # verbier.save()
        # val_d_isere = ResortModel(name="Val d'Isere")
        # val_d_isere.save()
        # la_clusaz = ResortModel(name="La Clusaz")
        # la_clusaz.save()

        # favorite_resort = FavoriteResortModel(user_id=user_rob.id, resort_id=verbier.id)
        # favorite_resort.save()

        print("Database seeded.")

    except SQLAlchemyError as e:
        print(e)
