from app.services.scheme_service import get_scheme


# Dummy farmer data (you can tweak later)
user_data = {
    "location": "Karnataka",
    "income": "low",
    "land": "small",
    "gender": "male",
    "need": "financial support"
}


def main():
    result = get_scheme(user_data)

    print("\n===== RESULT =====\n")
    print(result)


if __name__ == "__main__":
    main()