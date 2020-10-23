import pymongo
import csv


# Connect with MongoDB Cloud DB
CONNECTION_STRING = "mongodb+srv://zali:zali12345678@cluster0.fvqsw.mongodb.net/trolley-database?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)

# Database & Collection
db = client['hospital']
my_col = db["trolley_tem"]

print(my_col)

def insert_from_csv():
    """Insert Data In the database from CSV File : Q2.b"""

    # Create a JSON List
    with open('data.csv', 'r') as file:
        my_list = []
        reader = csv.reader(file)
        for row in reader:
            my_dict = {}
            my_dict['name'] = row[0]
            my_dict['date_time'] = row[1]
            my_dict['trolley_tem'] = row[2]
            my_list.append(my_dict)

    # Insert All Into MongoDB
    ids = my_col.insert_many(my_list)

    #print list of the _id values of the inserted documents:
    print(ids.inserted_ids)

        


insert_from_csv()