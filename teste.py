from flask import Flask
import mysql.connector

app = Flask(__name__)

@app.route("/")
def index():
    return " "

if __name__ == "__main__":
    app.run(debug=True)