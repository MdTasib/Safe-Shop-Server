const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello')
})

const uri = "mongodb+srv://safeshop:safeshop@cluster0.do24a.mongodb.net/SafeShop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("SafeShop").collection("products");

  // post book on database
  app.post('/addBook', (req, res) => {
    const newBook = req.body;
    console.log(newBook);
    collection.insertOne(newBook)
      .then(result => res.send(result.acknowledged));
  });
});


app.listen(5000);