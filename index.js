const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

const uri = "mongodb+srv://safeshop:safeshop@cluster0.do24a.mongodb.net/SafeShop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("SafeShop").collection("products");


});


app.listen(4000);