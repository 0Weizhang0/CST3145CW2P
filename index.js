var express = require("express");
var app = express('express');
var cors = require('cors');
var mongoClient = require("mongodb").MongoClient //声明标识符
let db

mongoClient.connect('mongodb+srv://wei:jklasd@lesson.0zazi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
    db = client.db('cst3145cw2p')
})
//链接到mongodb数据库
app.use(express.static('static'));

app.use(function(req, res, next) {
        console.log("Request IP: " + req.url);
        console.log("Request date: " + new Date());
        next();
    });
    
    app.use(function(request, response, next){
        console.log("In comes a " + request.method + " to " + request.url);
        next();
    });
    app.use(function(request, response, next) { 
    console.log("In comes a request to: " + request.url);
    next();
    });
//logger middleware

app.param('collectionName',(req,res,next,collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

app.get('/',(req,res,next) => {
    res.send('Welcome to the MongoDB Express server.')
})
//主页面

app.get('/collection/:collectionName/:lesson/:aaa', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
    if (e) return next(e)
    res.send(results)
    })
})

app.get('/collection/:collectionName/:lesson/:aaa', (req, res, next) => {
req.collection.find({}, {limit: 5, sort: [['price', -1]]})
.toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
})

//GET all lessons
app.get("/collection/:collectionName/:lesson/:aaa", async (req, res) => {
    res.json(await getLessons(req.collection, "", req.sortBy, req.sortOrder));
});

app.listen(3000)