import utils
import json
from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
import string

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("main.html")

@app.route('/mqtt')
def mqtt_data():
    utils.run()

@app.route('/province_count',methods=['POST'])
def init_province_count():
    name = request.form.get('pname','')
    data = utils.init_province_count(name)
    return data

@app.route('/province_data')
def init_province_data():
    data = utils.init_province_data()
    return data

@app.route('/city_data',methods=['POST'])
def init_city_data():
    name = request.form.get('pname','')
    data = utils.init_city_data(name)
    return data

@app.route("/time")
def get_time():
    return utils.get_time()

@app.route("/mqtt_data")
def get_mqtt_data():
    return utils.get_mqtt_data()

@app.route("/line_province_data",methods=['POST'])
def line_province_data():
    name=request.form.get('pname',' ')
    print(name)
    print(name)
    print(name)
    data = utils.line_province_chart(name)
    return data

@app.route("/bar_global_data",methods=['POST'])
def bar_province_data():
    data=utils.bar_global_chart()
    return data

@app.route("/line_city_data",methods=['POST'])
def line_data():
    data = utils.line_city_chart('Shenzhen')
    return data

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)