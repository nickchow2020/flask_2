from flask import Flask,render_template,request,jsonify
from random import randint
import requests
from requests.models import requote_uri
app = Flask(__name__)

@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route('/api/get-lucky-num',methods=["POST"])
def handle_lucky_api():

    _errors = {}

    response = request.get_json()

    name = response.get("name","")
    email = response.get("email","")
    year = response.get("year","")
    color = response.get("color","")

    handle_error_meesage(_errors,name,email,year,color)

    random_number = randint(1,101)

    num_fact = requests_random_number_fact(random_number)

    year_fact = request_year_fact(year)

    result = structure_result(num_fact,year_fact)

    if len(_errors) == 0:
        return jsonify(result)

    else:
        return jsonify(errors=_errors)


def handle_error_meesage(err_container,name,email,year,color):
    """to handle error check """
    if len(name) == 0:
        err_container["name"] = ["This field is required,<name>"]
    if len(email) == 0:
        err_container["email"] = ["This field is required,<email>"]
    if len(year) == 0:
        err_container["year"] = ["This field is required,<year>"]
    if len(color) == 0:
        err_container["color"] = ["This field is required,<color>"]

    if int(year) not in list(range(1900,2001)):
        err_container["year"] = ["Invalid value, must be years between 1900-2000"]

    if color not in ["red","green","orange","blue"]:
        err_container["color"] = ["Invalid value, must be one of: red, green, orange, blue"]


def requests_random_number_fact(number):
    return requests.get(f"http://numbersapi.com/{number}?json").json()

def request_year_fact(year):
    return requests.get(f"http://numbersapi.com/{year}/year?json").json()

def structure_result(num,year):
    return {
                "num":{
                    "fact":num["text"],
                    "num" : num["number"]
                },
                "year":{
                    "fact": year["text"],
                    "year": year["number"]
                }
            }


