from os import getenv
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

# Access environment variables
API_KEY = getenv("OPENAI_API_KEY")


# Define fonts
# TOC = Table of Contents
TOC_FONT = "Garamond"
TITLE_FONT = "Garamond"
CONTENT_FONT = "Caslon"
