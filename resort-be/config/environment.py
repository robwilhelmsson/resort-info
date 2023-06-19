from os import environ
from dotenv import load_dotenv

ENVIRONMENT_FILE = environ.get('ENV_FILE') or '.env'
load_dotenv(ENVIRONMENT_FILE, override=True)

db_URI = environ.get('DB_URI')
secret = environ.get('SECRET')