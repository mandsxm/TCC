def get_db():
    return mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password='',
        database='almoxarifado',
        port=3306
    )
