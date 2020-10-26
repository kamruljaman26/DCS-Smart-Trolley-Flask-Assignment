from flask import Flask, render_template, request, jsonify, redirect, url_for
from model import db, add_single_record, get_all_records, add_mul_records
import json
from io import TextIOWrapper
import csv
from datetime import datetime


app = Flask(__name__)


# Get Home Page for ADD recording
@app.route("/")
def index():
    datas = get_all_records()
    return render_template('index.html', datas=datas)


# Add record in the database
@app.route("/create-record", methods=['POST'])
def add_record():
    name = request.form.get('name')
    date = request.form.get('date')
    time = request.form.get('time')
    temp = request.form.get('temp')
    va = add_single_record(name, date, time, temp)
    return redirect(url_for('index'))


@app.route("/upload-from-file", methods=['POST'])
def add_record_from_file():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        csv_file = TextIOWrapper(uploaded_file, encoding='utf-8')
        csv_reader = csv.reader(csv_file, delimiter=',')
        my_list = []
        for row in csv_reader:
            my_dict = {}
            date_time = datetime.strptime(str(row[1]), "%Y-%m-%dT%H:%M")
            date = date_time.date()
            time = date_time.time()

            my_dict['name'] = row[0]
            my_dict['date'] = str(date)
            my_dict['time'] = str(time)
            my_dict['temp'] = row[2]
            my_list.append(my_dict)

        add_mul_records(my_list)
    return redirect(url_for('index'))


# Main Function
if __name__ == '__main__':
    app.run(debug=True)
