import pymongo
import json

# Connect with MongoDB Cloud DB
CONNECTION_STRING = "mongodb+srv://zali:zali12345678@cluster0.fvqsw.mongodb.net/hospital?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)

# Database & Collection
db = client['hospital']
my_col = db["new_trolleys"]


# Add Single Trolley Record in DB
def add_single_record(name, date, time, temp):
    try:
        print(name,date,time,temp)
        mydict = {
            "name": name,
             "date": date,
             "time": time,
             "temp": temp,
            }
        my_col.insert_one(mydict)
        return True
    except Exception as e:
        print(e.__str__())
        return False


# Add Multiple Trolley Record in DB
def add_mul_records(my_list):
    # Insert All Into MongoDB
    ids = my_col.insert_many(my_list)

    # print list of the _id values of the inserted documents:
    print(ids.inserted_ids)


# Read all data from database
def get_all_records():
    data = my_col.find({},{ "_id":0,"name": 1, "date": 1,"time":1,"temp":1 })
    return data
