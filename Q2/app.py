from flask import Flask
import pymongo
from database import db, my_col



app = Flask(__name__)

# client = pymongo.MongoClient("mongodb+srv://zali:<password>@cluster0.fvqsw.mongodb.net/<dbname>?retryWrites=true&w=majority")
# db = client.test

# client = pymongo.MongoClient("mongodb+srv://zali:<password>@cluster0.fvqsw.mongodb.net/<dbname>?retryWrites=true&w=majority")
# db = client.test


@app.route('/')
def index():
    return 'hello word'

#test to insert data to the data base
@app.route("/test")
def test():
    db.db.collection.insert_one({"name": "John"})
    return "Connected to the data base!"


# Main Function
if __name__ == '__main__':
    app.run(debug=True)