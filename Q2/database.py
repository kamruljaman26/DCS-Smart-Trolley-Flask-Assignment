import pymongo
import csv
from datetime import datetime, timedelta
# datetime.strptime("2020-08-11T06:00","%Y-%m-%dT%H:%M")

# Connect with MongoDB Cloud DB
CONNECTION_STRING = "mongodb+srv://zali:zali12345678@cluster0.fvqsw.mongodb.net/hospital?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)

# Database & Collection
db = client['hospital']
my_col = db["trolleys"]


# Insert Data In the database from CSV File : Q2.b
def insert_from_csv():

    # Create a JSON List
    with open('static/data.csv', 'r') as file:
        my_list = []
        reader = csv.reader(file)
        for row in reader:
            my_dict = {}
            date_time = datetime.strptime(row[1], "%Y-%m-%dT%H:%M")
            date = date_time.date()
            time = date_time.time()

            my_dict['name'] = row[0]
            my_dict['date'] = str(date)
            my_dict['time'] = str(time)
            my_dict['temp'] = row[2]
            my_list.append(my_dict)

    # Insert All Into MongoDB
    ids = my_col.insert_many(my_list)

    # print list of the _id values of the inserted documents:
    print(ids.inserted_ids)


# Get All Chart Data
def get_chart_data(date):
    trolley_data = my_col.find({"date": date},{ "_id": 0, "name": 1, "date": 1,"time" : 1, "temp":1 })
    
    my_list = []
    for data in trolley_data:
        my_list.append(data)
    return my_list



