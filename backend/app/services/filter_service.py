def filter_schemes(schemes, farmer):
    filtered = []

    location = farmer.get("location", "").lower()
    need = farmer.get("immediate_need", "").lower()
    income = farmer.get("income_level", "").lower()

    for scheme in schemes:
        scheme_text = json_to_text(scheme).lower()

        if location and location not in scheme_text:
            continue

        if need and need not in scheme_text:
            continue

        if income and income not in scheme_text:
            continue

        filtered.append(scheme)

    return filtered[:20]


def json_to_text(obj):
    if isinstance(obj, dict):
        return " ".join(json_to_text(v) for v in obj.values())
    elif isinstance(obj, list):
        return " ".join(json_to_text(i) for i in obj)
    else:
        return str(obj)