from os import environ
from dotenv import load_dotenv

ENVIRONMENT_FILE = environ.get('ENV_FILE') or '.env'
load_dotenv(ENVIRONMENT_FILE, override=True)

db_URI = "postgresql://localhost:5432/resorts_db"
secret = 'correcthorsebatterystaple'