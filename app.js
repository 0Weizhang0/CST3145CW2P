var express = require("express");
var app = express();
var http = require("http");
const {MongoClient}
// Requires the modules needed
var path = require("path");
var fs = require("fs");


app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
    });

// the 'logger' middleware
app.use(function(req, res, next) {
console.log("Request IP: " + req.url);
console.log("Request date: " + new Date());
next();
});

app.use(function(req, res, next) {
    // Uses path.join to find the path where the file should be
    var filePath = path.join(__dirname,
    "static"
    , req.url);
    // Built-in fs.stat gets info about a file
    fs.stat(filePath, function(err, fileInfo) {
    if (err) {
    next();
    return;
    }
    if (fileInfo.isFile()) res.sendFile(filePath);
    else next();
    });
    });
    
    // There is no 'next' argument because this is the last middleware.
app.use(function(req, res, next) {
    // Sets the status code to 404
    res.status(404);
    // Sends the error "File not found!”
    res.send("File not found!");
    next();
    });

// Starts the app on port 3000 and display a message when it’s started
app.listen(3000, function() {
console.log("App started on port 3000");
})