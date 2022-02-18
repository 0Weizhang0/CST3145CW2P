const express = require('express')
const app = express()
app.use(express.json())

const MongoClient = require("mongodb").MongoClient
let db;

MongoClient.connect('mongodb+srv://wei:jklasd@lesson.0zazi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
, (err, client) => {
db = client.db('lesson')
})

app.param('collectionName',(req,res,next,collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

app.get('/',(req,res,next) => {
    res.send('Welcome to the MongoDB Express server.')
})

app.get('/collection/:collectionName'
, (req, res, next) => {
req.collection.find({}).toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
})

app.get('/collection/:collectionName'
, (req, res, next) => {
req.collection.find({}, {limit: 5, sort: [['price'
, -1]]})
.toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
})


app.listen(3000)