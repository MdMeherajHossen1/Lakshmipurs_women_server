const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const admin = require("firebase-admin");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

// middle ware
app.use(cors());
app.use(express.json());