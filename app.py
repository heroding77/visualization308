from flask import Flask, render_template, send_from_directory     
import os

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/index')
def home():
    return index()


@app.route('/video')
def video():
    return render_template("video.html")

@app.route('/map')
def map():
    return render_template("map.html")

@app.route('/line_map')
def line_map():
    return render_template("line_map.html")

@app.route('/line_map2')
def line_map2():
    return render_template("line_map2.html")

@app.route('/line_map3')
def line_map3():
    return render_template("line_map3.html")

@app.route('/some_data')
def some_data():
    return render_template("some_data.html")

@app.route('/Projections1')
def Projections1():
    return render_template("Projections1.html")

@app.route('/Projections2')
def Projections2():
    return render_template("Projections2.html")

@app.route('/Projections3')
def Projections3():
    return render_template("Projections3.html")

@app.route('/Projections4')
def Projections4():
    return render_template("Projections4.html")

@app.route('/Projections5')
def Projections5():
    return render_template("Projections5.html")

@app.route('/favicon.ico')
def favicon():
    print(os.path.join(app.root_path, 'static/assets/images'))
    return send_from_directory(os.path.join(app.root_path, 'static','assets','images'), '308four.icon')




if __name__ == '__main__':
    app.run(host='localhost',port=8001,debug=True)
