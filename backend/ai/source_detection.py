def detect_source(pm25, traffic, wind):
    if pm25 < 0 or traffic < 0 or wind < 0:
        return "Invalid Data"

    if pm25 > 150 and traffic > 80 and wind < 5:
        return "Traffic Pollution"

    elif pm25 > 150 and traffic < 40:
        return "Industrial Pollution"

    elif wind > 10:
        return "Natural Dispersion"

    else:
        return "Mixed Source"
