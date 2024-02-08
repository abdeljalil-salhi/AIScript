from os import getenv
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

# Access environment variables
API_KEY = getenv("OPENAI_API_KEY")
