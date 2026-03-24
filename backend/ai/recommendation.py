def recommend(aqi, source):
    if aqi < 0:
        return "Invalid Data"

    if aqi > 300 and source == "Traffic Pollution":
        return "Restrict heavy vehicles immediately"

    elif source == "Industrial Pollution":
        return "Inspect industrial emissions"

    elif aqi > 200:
        return "Increase monitoring and advisories"

    else:
        return "Normal monitoring"
