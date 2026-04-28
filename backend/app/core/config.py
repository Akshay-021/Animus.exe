import os

# go from config.py → app → backend → project root
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../..")
)

DATA_DIR = os.path.join(BASE_DIR, "data")
SCHEME_PATH = os.path.join(DATA_DIR, "schemes", "processed_schemes.json")