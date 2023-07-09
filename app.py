from flask import Flask, render_template, send_from_directory     
import os

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/index')
def home():
    return index()

@app.route('/map')
def map():
    return render_template("map.html")


@app.route('/openrank')
def map():
    return render_template("openrank.html")

@app.route('/activity')
def map():
    return render_template("activity.html")

@app.route('/attention')
def map():
    return render_template("attention.html")

@app.route('/stars')
def map():
    return render_template("stars.html")


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static','assets','images'), '308four.icon')




if __name__ == '__main__':
    app.run(host='localhost',port=8001,debug=True)
