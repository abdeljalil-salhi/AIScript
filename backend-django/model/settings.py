from os import getenv, path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))

# Access environment variables
API_KEY = getenv("OPENAI_API_KEY")

MEDIA_URL = "/media/"
MEDIA_ROOT = path.join(BASE_DIR, "media")

# Define fonts
# TOC = Table of Contents
TOC_FONT = "Garamond"
TITLE_FONT = "Garamond"
CONTENT_FONT = "Caslon"
