import psycopg2

def get_connection():
    try:
        conn = psycopg2.connect(
            dbname="vayunetra",
            user="postgres",
            password="password",
            host="localhost",
            port="5432"
        )
        return conn
    except Exception as e:
        print("DB connection error:", e)
        return None

def insert_record(data):
    conn = get_connection()
    if conn is None:
        return False

    try:
        cursor = conn.cursor()

        query = """
        INSERT INTO aqi_records 
        (pm25, pm10, temp, humidity, wind, traffic, aqi, source, advisory, recommendation)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """

        cursor.execute(query, (
            data.get("pm25"), data.get("pm10"), data.get("temp"),
            data.get("humidity"), data.get("wind"), data.get("traffic"),
            data.get("aqi"), data.get("source"),
            data.get("health"), data.get("recommendation")
        ))

        conn.commit()
        cursor.close()
        conn.close()
        return True

    except Exception as e:
        print("Insert error:", e)
        return False
