// Dependancies
// We need to require all of our dependacies
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
// Global Variables
// Declaring global variables
const PORT = process.env.PORT || 10000;
// const db = require("Develop/db/db.json");
let num = 0
// Middlewear
// we need the urlencoded middle which gives us access to req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
// We need a middlewear to have our css and javascript files be loaded from the public folder
app.use(express.static('public'))
// Routes
// HTML ROUTES HERE
// We're gonna need to create a route to server our html files so when we hit those endpoints, the browser will serve our html to us.
// Our goal is to display what's in the index.html to the root route I.E localhost:10000/
// What are our tools?
// fs module, path
// If we were to go the fs route, we would need to use readFile to grab the data within index.html and then res.send(data) to serve to our front-end
// If we were to use res.sendFile
// We are defining our home route, which takes in a callback function with request and response
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
// API ROUTES HERE
// Our end goal is to return the data in db.json in our response
// What are our tools, we have express get, express post, and express delete
// 2 ways of handling this problem. #1 we can make variable to store the db.json file
// #2 we need to use fsreadfile if we want the grab the data and send it to the front-end
// We write a test route to see how data will be pushed in when we do our post. *Remember POST routes accepts data from the front-end and then can be populated in an obj to be pushed into an array
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "Develop/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/test", (req, res) => {
    num++
    const x = {
        title: "hello",
        text: "world",
        id: num
    }
    db.push(x)
    // Last step is to use fswritefile to write the db data back into db.json file
    res.json(db)
})
// When doing a post request rememeber to console.log the req.body
// A post follows similar syntax using req and res as the callback
// because we declare our db at the very top
// Server listener
app.listen(PORT, () => {
    console.log("You started up the server");
})