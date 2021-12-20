const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
// const admin = require("firebase-admin");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

// middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vtipi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async await function for database
async function run() {
    try {
        // connect and handle database
        await client.connect();
        const database = client.db('lakshmipurs_women')
        const productCollection = database.collection('products')
        const usersCollection = database.collection('users')
        const ordersCollection = database.collection('orders')

        //  products Post api
        app.post('/products', async (req, res) => {
            const result = await productCollection.insertOne(req.body)
            res.json(result)
        })

        // products Get api
        app.get('/products', async (req, res) => {
            const result = await productCollection.find({}).toArray();
            res.json(result)
        })

        // Products delete API
        app.delete('/products', async (req, res) => {
            req.send('deleted Products')
        })


    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Laskhmipurs women server is online')
})

app.listen(port, () => {
    console.log('port is running on', port)
})