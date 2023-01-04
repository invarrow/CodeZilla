from flask import jsonify,Flask,render_template,send_file
import csv

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/src/imgs/moonmap")
def moonmap():
    file = "static/imgs/moonmap.jpg"
    return send_file(file,mimetype = "image")

@app.route("/src/imgs/dMap")
def dMap():
    file = "static/imgs/dmap.tif"
    return send_file(file,mimetype = "image")

@app.route("/data")
def data():
    file = "static/loco.csv"
    arr = []
    with open(file,'r') as f:
        csvReader = csv.reader(f)
        for row in csvReader:
            arr.append([row[4],row[5]])
    return jsonify(arr)

if __name__ == "__main__":
    app.run(debug=True, port=1234)

