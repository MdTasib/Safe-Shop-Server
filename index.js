const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello')
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.do24a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("SafeShop").collection("products");

  // post book on database
  app.post('/addBook', (req, res) => {
    const newBook = req.body;
    collection.insertOne(newBook)
      .then(result => res.send(result.acknowledged));
  });

  // get book on database
  app.get('/books', (req, res) => {
    collection.find({})
      .toArray((error, document) => {
        res.send(document);
      });
  });

  // delete book on database
  app.delete('/deleteBook/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    collection.deleteOne({ _id: id })
      .then(result => res.send(result.acknowledged));
  });
});


app.listen(5000);