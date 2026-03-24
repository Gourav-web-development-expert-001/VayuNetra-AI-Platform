def health_advice(aqi):
    if aqi < 0:
        return "Invalid AQI"

    if aqi <= 50:
        return "Air quality is good"

    elif aqi <= 100:
        return "Moderate air quality"

    elif aqi <= 200:
        return "Sensitive groups should be cautious"

    elif aqi <= 300:
        return "Wear mask outdoors"

    else:
        return "Avoid outdoor exposure completely"
