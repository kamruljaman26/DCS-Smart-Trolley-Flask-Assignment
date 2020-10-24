from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from database import get_chart_data

app = Flask(__name__)

# Render Home Page
@app.route('/')
def index():
    return render_template('index.html')


# Get All data In JSON by API
@app.route('/api/v1/get_chart_data', methods=['GET'])
def chart_data():
    if 'date' in request.args:
        date = str(request.args['date'])
    else:
        return "Error: No date field provided. Please specify an date."

    return jsonify(get_chart_data(date=date))


# Main Function
if __name__ == '__main__':
    app.run(debug=True)
