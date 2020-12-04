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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"))
});


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "Develop/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});




// Server listener
app.listen(PORT, () => {
    console.log("You started up the server");
})